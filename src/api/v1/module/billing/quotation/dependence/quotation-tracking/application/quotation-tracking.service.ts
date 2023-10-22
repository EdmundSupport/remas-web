import { Injectable, Inject } from "@nestjs/common";
import { QuotationService } from "../../../application/service";
import { QuotationMaintenanceService } from "../../quotation-maintenance/application/service/quotation-maintenance.service";
import { Quotation, QuotationDetail, QuotationStatus } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { FilterResponseHelper } from "shared/filter_response";
import { QuotationChargeService } from "../../quotation-charge/application/service/quotation-charge.service";
import { InventoryMovement } from "src/api/v1/datasource/remas/shared/domain/model/inventory/inventory-movement";
import { InventoryMovementService } from "src/api/v1/module/inventory/inventory-movement/application/service/inventory-movement.service";
import { StructureHashTable } from "shared/structure";
import { v4 as uuidV4 } from 'uuid';
@Injectable()
export class QuotationTrackingService {
    constructor(
        @Inject('QuotationRepository')
        private quotationRepository: typeof Quotation,
        @Inject('QuotationStatusRepository')
        private quotaitonStatusService: typeof QuotationStatus,
        @Inject('InventoryMovementRepository')
        private inventoryMovementRespository: typeof InventoryMovement,
        private inventoryMovementService: InventoryMovementService,
        @Inject('QuotationDetailRepository')
        private quotationDetailService: typeof QuotationDetail,
        private quotationService: QuotationService,
        private quotationMaintenanceService: QuotationMaintenanceService,
        private quotationChargeService: QuotationChargeService,
        @Inject('QUOTATION_CONFIRM_TABLE')
        private quotationConfirmTableHashTable: StructureHashTable,
    ) { }

    async confirm(quotationUuid: string, confirmUuid?: string) {
        const quotationStatus = await this.quotaitonStatusService.findOne({ where: { keyName: 'confirmed' } });
        if (!quotationStatus) {
            FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado de confirmado.')
        }

        const quotation = await this.quotationService.findOne(quotationUuid);
        if (!confirmUuid) {
            const stocksExceeded = await Promise.all(quotation.quotationDetails.map(async (quotationDetail, index, array) => {
                const stock = await this.inventoryMovementService.stock(quotationDetail.productUuid);
                if ((stock >= Number(quotationDetail.amount))) {
                    array.splice(index, 1);
                    return;
                }

                return {
                    stock,
                    productUuid: quotationDetail.productUuid,
                }
            }));
            if (stocksExceeded?.length > 0) {
                const confirmUuidSend = uuidV4();
                this.quotationConfirmTableHashTable.set(confirmUuidSend, true);
                const message = JSON.stringify('Los siguientes productos, no tienen el stock suficiente. \n' + stocksExceeded.map((stockExceeded) => `uuid:${stockExceeded.productUuid}\tstock:${stockExceeded.stock}`).join('\n'));
                throw FilterResponseHelper.httpException('ACCEPTED', message, { stocksExceeded, confirmUuid: confirmUuidSend });
            }
        }

        if (confirmUuid) {
            const confirmUuidReceived = this.quotationConfirmTableHashTable.get(confirmUuid);
            if (!confirmUuidReceived)
                throw FilterResponseHelper.httpException('BAD_REQUEST', 'No se pudo confirmar la operación.');
        }

        await this.quotationMaintenanceService.generate(quotationUuid, new Promise((resolve) => resolve(quotation)));
        await this.quotationChargeService.generate(quotationUuid, new Promise((resolve) => resolve(quotation)));


        quotation.quotationDetails.map(async (quotationDetail) => {
            const inventoryMovement = await this.inventoryMovementRespository.create({
                amount: Number(quotationDetail.amount) * -1,
                productUuid: quotationDetail.productUuid,
                measureUnitUuid: quotationDetail.measureUnitUuid,
                referenceSchema: 'billing',
                referenceTable: 'quotation_detail',
                referenceUuid: quotationDetail.uuid,
                date: quotation.date,
            });

            this.quotationDetailService.update({
                inventoryMovementUuid: inventoryMovement.uuid
            }, { where: { uuid: quotationDetail.uuid } });
        });
        await this.quotationRepository.update({ quotationStatusUuid: quotationStatus.uuid }, { where: { uuid: quotationUuid } });
        return true;
    }
}
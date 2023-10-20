import { Injectable, Inject } from "@nestjs/common";
import { QuotationService } from "../../../application/service";
import { QuotationMaintenanceService } from "../../quotation-maintenance/application/service/quotation-maintenance.service";
import { Quotation, QuotationDetail, QuotationStatus } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { FilterResponseHelper } from "shared/filter_response";
import { QuotationChargeService } from "../../quotation-charge/application/service/quotation-charge.service";
import { InventoryMovement } from "src/api/v1/datasource/remas/shared/domain/model/inventory/inventory-movement";

@Injectable()
export class QuotationTrackingService {
    constructor(
        @Inject('QUOTATION_REPOSITORY')
        private quotationRepository: typeof Quotation,
        @Inject('QUOTATION_STATUS_REPOSITORY')
        private quotaitonStatusService: typeof QuotationStatus,
        @Inject('INVENTORY_MOVEMENT_REPOSITORY')
        private inventoryMovementService: typeof InventoryMovement,
        @Inject('QUOTATION_DETAIL_REPOSITORY')
        private quotationDetailService: typeof QuotationDetail,
        private quotationService: QuotationService,
        private quotationMaintenanceService: QuotationMaintenanceService,
        private quotationChargeService: QuotationChargeService,
    ) { }

    async confirm(quotationUuid: string) {
        const quotationStatus = await this.quotaitonStatusService.findOne({ where: { keyName: 'confirmed' } });
        if (!quotationStatus) {
            FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado de confirmado.')
        }

        const quotation = await this.quotationService.findOne(quotationUuid);
        await this.quotationMaintenanceService.generate(quotationUuid, new Promise((resolve) => resolve(quotation)));
        await this.quotationChargeService.generate(quotationUuid, new Promise((resolve) => resolve(quotation)));

        quotation.quotationDetails.map(async (quotationDetail) => {
            const inventoryMovement = await this.inventoryMovementService.create({
                amount: quotationDetail.amount,
                productUuid: quotationDetail.productUuid,
                measureUnitUuid: quotationDetail.measureUnitUuid,
                referenceSchema: 'billing',
                referenceTable: 'quotation_detail',
                referenceUuid: quotationDetail.uuid,
            });

            this.quotationDetailService.update({
                inventoryMovementUuid: inventoryMovement.uuid
            }, { where: { uuid: quotationDetail.uuid } });
        });
        await this.quotationRepository.update({ quotationStatusUuid: quotationStatus.uuid }, { where: { uuid: quotationUuid } });
        return true;
    }
}
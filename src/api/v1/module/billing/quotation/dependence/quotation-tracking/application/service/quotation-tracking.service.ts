import { Injectable, Inject } from "@nestjs/common";
import { QuotationService } from "../../../../application/service";
import { QuotationMaintenanceService } from "../../../quotation-maintenance/application/service/quotation-maintenance.service";
import { Quotation, QuotationDetail, QuotationStatus } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { FilterResponseHelper } from "shared/filter_response";
import { QuotationChargeService } from "../../../quotation-charge/application/service/quotation-charge.service";
import { InventoryMovement } from "src/api/v1/datasource/remas/shared/domain/model/inventory/inventory-movement";
import { InventoryMovementService } from "src/api/v1/module/inventory/inventory-movement/application/service/inventory-movement.service";
import { StructureHashTable } from "shared/structure";
import { InventoryMovementHelper } from "src/api/v1/module/inventory/inventory-movement/application/helper/inventory-movement.helper";
import { Warehouse } from "src/api/v1/datasource/remas/shared/domain/model/inventory/warehouse";
import { WarehouseType } from "src/api/v1/datasource/remas/shared/domain/model/inventory/warehouse-type";

@Injectable()
export class QuotationTrackingService {
    constructor(
        @Inject('QuotationRepository')
        private quotationRepository: typeof Quotation,
        @Inject('QuotationStatusRepository')
        private quotaitonStatusService: typeof QuotationStatus,
        @Inject('InventoryMovementRepository')
        private inventoryMovementRespository: typeof InventoryMovement,
        @Inject('QuotationDetailRepository')
        private quotationDetailService: typeof QuotationDetail,
        private quotationService: QuotationService,
        private quotationMaintenanceService: QuotationMaintenanceService,
        private quotationChargeService: QuotationChargeService,
        @Inject('INVENTORY_CONFIRM_HASH_TABLE')
        private inventoryConfirmHashTable: StructureHashTable,
        private inventoryMovementHelper: InventoryMovementHelper,
        @Inject('WarehouseRepository')
        private warehouseRepository: typeof Warehouse,
    ) { }

    async confirm(quotationUuid: string, confirmUuid?: string) {
        const quotationStatus = await this.quotaitonStatusService.findOne({ where: { keyName: 'confirmed' } });
        if (!quotationStatus) {
            FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado de confirmado.')
        }

        const quotation = await this.quotationService.findOne(quotationUuid);
        if (!confirmUuid) {
            this.inventoryMovementHelper.stocksExceeded(
                quotation.quotationDetails
                    .map(i => ({ productUuid: i.productUuid, amountRequired: Number(i.amount) })));
        }


        if (confirmUuid) {
            const confirmUuidReceived = this.inventoryConfirmHashTable.get(confirmUuid);
            if (!confirmUuidReceived)
                throw FilterResponseHelper.httpException('BAD_REQUEST', 'No se pudo confirmar la operación.');
        }

        await this.quotationMaintenanceService.generate(quotationUuid, new Promise((resolve) => resolve(quotation)));
        await this.quotationChargeService.generate(quotationUuid, new Promise((resolve) => resolve(quotation)));

        const warehouseOrigin = await this.warehouseRepository.findOne({ include: [{ model: WarehouseType, where: { key: 'warehouse' } }] });
        if (!warehouseOrigin)
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar la bodega de origen.');

        const warehouseDestiny = await this.warehouseRepository.findOne({ include: [{ model: WarehouseType, where: { key: 'workshop' } }] });
        if (!warehouseDestiny)
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar la bodega de destino.');

        Promise.all(quotation.quotationDetails.map(async (quotationDetail) => {
            const inventoryMovement = await this.inventoryMovementRespository.create({
                date: quotation.date,
                amount: Number(quotationDetail.amount) * -1,
                warehouseOriginUuid: warehouseOrigin.uuid,
                originUuid: warehouseOrigin.uuid,
                warehouseDestinyUuid: warehouseDestiny.uuid,
                destinyUuid: warehouseDestiny.uuid,
                productUuid: quotationDetail.productUuid,
                measureUnitUuid: quotationDetail.measureUnitUuid,
                referenceSchema: 'billing',
                referenceTable: 'quotation_detai',
                referenceUuid: quotationDetail.uuid,
            });

            await this.quotationDetailService.update({
                inventoryMovementUuid: inventoryMovement.uuid
            }, { where: { uuid: quotationDetail.uuid } });
        }));
        await this.quotationRepository.update({ quotationStatusUuid: quotationStatus.uuid }, { where: { uuid: quotationUuid } });
        return true;
    }
}
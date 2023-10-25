import { Inject, Injectable } from "@nestjs/common";
import { FilterResponseHelper } from "shared/filter_response/application/helper/filter_response.helper";
import { MaintenanceStatus } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { InventoryMovement, MeasureUnit, ProductMaintenanceStep, ProductMaintenanceStepDetail, Warehouse, WarehouseType } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { MaintenanceService } from "../../../../application/service/maintenance.service";
import { InventoryMovementHelper } from "src/api/v1/module/inventory/inventory-movement/application/helper/inventory-movement.helper";
import { StructureHashTable } from "shared/structure/application/hash/structure.hash_table";

@Injectable()
export class MaintenanceTrackingService {
    constructor(
        @Inject('InventoryMovementRepository')
        private inventoryMovementRepository: typeof InventoryMovement,
        private inventoryMovementHelper: InventoryMovementHelper,
        @Inject('MaintenanceStatusRepository')
        private maintenanceStatusRepository: typeof MaintenanceStatus,
        private maintenanceService: MaintenanceService,
        @Inject('INVENTORY_CONFIRM_HASH_TABLE')
        private inventoryConfirmHashTable: StructureHashTable,
        @Inject('ProductMaintenanceStepDetailRepository')
        private productMaintenanceStepDetailRepository: typeof ProductMaintenanceStepDetail,
        @Inject('WarehouseRepository')
        private warehouseRepository: typeof Warehouse,
        @Inject('MeasureUnitRepository')
        private measureUnitRepository: typeof MeasureUnit,
    ) { }

    async confirm(uuid: string, confirmUuid?: string) {
        const status = await this.maintenanceStatusRepository.findOne({ where: { keyName: 'confirmed' } });
        console.log("🚀 ~ file: maintenance-tracking.service.ts:30 ~ MaintenanceTrackingService ~ confirm ~ status:", status)
        if (!status) {
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado de confirmado.')
        }

        const maintenance = await this.maintenanceService.findOne(uuid);
        const productMaintenanceStepsUuid = maintenance.maintenanceSteps.map((maintenanceStep) => maintenanceStep.productMaintenanceStepUuid);
        const productMaintenaceStepDetails = await this.productMaintenanceStepDetailRepository.findAll({
            where: { productMaintenanceStepUuid: productMaintenanceStepsUuid }
        });

        const amountsRequired = productMaintenaceStepDetails.map((productMaintenaceStepDetail) => {
            return {
                productUuid: productMaintenaceStepDetail.productUuid,
                amountRequired: Number(productMaintenaceStepDetail.amount),
                measureUnitUuid: Number(productMaintenaceStepDetail.measureUnitUuid),
                uuid: productMaintenaceStepDetail.uuid,
            }
        })

        if (!maintenance) await this.inventoryMovementHelper.stocksExceeded(amountsRequired);

        if (confirmUuid) {
            const confirmUuidReceived = this.inventoryConfirmHashTable.get(confirmUuid);
            if (!confirmUuidReceived)
                throw FilterResponseHelper.httpException('BAD_REQUEST', 'No se pudo confirmar la operación.');
        }

        const warehouseOrigin = await this.warehouseRepository.findOne({ include: [{ model: WarehouseType, where: { key: 'warehouse' } }] });
        if (!warehouseOrigin)
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar la bodega de origen.');

        const warehouseDestiny = await this.warehouseRepository.findOne({ include: [{ model: WarehouseType, where: { key: 'workshop' } }] });
        if (!warehouseDestiny)
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar la bodega de destino.');

        const measureUnit = await this.measureUnitRepository.findOne({ where: { condition: true } });
        if (!measureUnit)
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar la unidad de medida.');

        const inventoryMovement = await this.inventoryMovementRepository.create({
            date: maintenance.dateStartScheduled,
            amount: 1,
            warehouseOriginUuid: warehouseOrigin.uuid,
            originUuid: warehouseOrigin.uuid,
            warehouseDetinyUuid: warehouseDestiny.uuid,
            destinyUuid: warehouseDestiny.uuid,
            productUuid: maintenance.productUuid,
            measureUnitUuid: measureUnit.uuid,
            referenceSchema: 'billing',
            referenceTable: 'maintenance',
            referenceUuid: maintenance.uuid,
        });

        Promise.all(amountsRequired.map(async (amountRequired) => {
            const inventoryMovement = await this.inventoryMovementRepository.create({
                date: maintenance.dateStartScheduled,
                amount: Number(amountRequired.amountRequired) * -1,
                warehouseOriginUuid: warehouseOrigin.uuid,
                originUuid: warehouseOrigin.uuid,
                warehouseDetinyUuid: warehouseDestiny.uuid,
                destinyUuid: warehouseDestiny.uuid,
                productUuid: amountRequired.productUuid,
                measureUnitUuid: amountRequired.measureUnitUuid,
                referenceSchema: 'billing',
                referenceTable: 'maintenance',
                referenceUuid: maintenance.uuid,
            });
        }));
    }
}
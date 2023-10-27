import { Inject, Injectable } from "@nestjs/common";
import { FilterResponseHelper } from "shared/filter_response/application/helper/filter_response.helper";
import { MaintenanceStatus } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { InventoryMovement, MeasureUnit, ProductMaintenanceStep, ProductMaintenanceStepDetail, Warehouse, WarehouseType } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { MaintenanceService } from "../../../../application/service/maintenance.service";
import { InventoryMovementHelper } from "src/api/v1/module/inventory/inventory-movement/application/helper/inventory-movement.helper";
import { StructureHashTable } from "shared/structure/application/hash/structure.hash_table";
import { ProductService } from "src/api/v1/module/inventory/product/application/service/product.service";

@Injectable()
export class MaintenanceTrackingService {
    constructor(
        @Inject('InventoryMovementRepository')
        private inventoryMovementRepository: typeof InventoryMovement,
        private inventoryMovementHelper: InventoryMovementHelper,
        @Inject('MaintenanceStatusRepository')
        private maintenanceStatusRepository: typeof MaintenanceStatus,
        private maintenanceService: MaintenanceService,
        @Inject('WarehouseRepository')
        private warehouseRepository: typeof Warehouse,
        @Inject('MeasureUnitRepository')
        private measureUnitRepository: typeof MeasureUnit,
        private productService: ProductService,
    ) { }

    async confirm(uuid: string, confirmUuid?: string) {
        const status = await this.maintenanceStatusRepository.findOne({ where: { keyName: 'confirmed' } });
        if (!status) {
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado de confirmado.')
        }

        const maintenance = await this.maintenanceService.findOne(uuid);
        const amountsRequired = maintenance.maintenanceSteps.map((step) => {
            return step.maintenanceStepDetails.map((detail) => {
                return {
                    productUuid: detail.productUuid,
                    amountRequired: Number(detail.amount),
                    measureUnitUuid: detail.measureUnitUuid,
                    uuid: detail.uuid,
                }
            });
        }).flat();
        if (!confirmUuid) await this.inventoryMovementHelper.stocksExceeded(amountsRequired);

        if (confirmUuid) {
            this.inventoryMovementHelper.verifyConfirm(confirmUuid);
        }

        const warehouseWarehouse = await this.warehouseRepository.findOne({ include: [{ model: WarehouseType, where: { key: 'warehouse' } }] });
        if (!warehouseWarehouse)
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar la bodega de origen.');

        const warehouseWorkshop = await this.warehouseRepository.findOne({ include: [{ model: WarehouseType, where: { key: 'workshop' } }] });
        if (!warehouseWorkshop)
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar la bodega de destino.');

        const measureUnit = await this.measureUnitRepository.findOne({ where: { condition: true } });
        if (!measureUnit)
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar la unidad de medida.');

        const inventoryMovement = await this.inventoryMovementRepository.create({
            date: maintenance.dateStartScheduled,
            amount: 1,
            warehouseOriginUuid: warehouseWarehouse.uuid,
            originUuid: warehouseWarehouse.uuid,
            warehouseDetinyUuid: warehouseWorkshop.uuid,
            destinyUuid: warehouseWorkshop.uuid,
            productUuid: maintenance.productUuid,
            measureUnitUuid: measureUnit.uuid,
            referenceSchema: 'billing',
            referenceTable: 'maintenance',
            referenceUuid: maintenance.uuid,
        });
        Promise.all(amountsRequired.map(async (amountRequired) => {
            const inventoryMovement = await this.inventoryMovementRepository.create({
                date: maintenance.dateStartScheduled,
                amount: Number(amountRequired.amountRequired),
                warehouseOriginUuid: warehouseWarehouse.uuid,
                originUuid: warehouseWarehouse.uuid,
                warehouseDetinyUuid: warehouseWorkshop.uuid,
                destinyUuid: warehouseWorkshop.uuid,
                productUuid: amountRequired.productUuid,
                measureUnitUuid: amountRequired.measureUnitUuid,
                referenceSchema: 'billing',
                referenceTable: 'maintenance_step_detail',
                referenceUuid: amountRequired.uuid,
            });
        }));
    }

    async finalized(uuid: string, confirmUuid?: string) {
        const status = await this.maintenanceStatusRepository.findOne({ where: { keyName: 'finalized' } });
        if (!status) {
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo obtener el estado.');
        }

        const maintenance = await this.maintenanceService.findOne(uuid);
        const amountsRequired = maintenance.maintenanceSteps.map((step) => {
            return step.maintenanceStepDetails.map((detail) => {
                return {
                    productUuid: detail.productUuid,
                    amountRequired: Number(detail.amount),
                    measureUnitUuid: detail.measureUnitUuid,
                    uuid: detail.uuid,
                }
            });
        }).flat();
        if (!confirmUuid) await this.inventoryMovementHelper.stocksExceeded(amountsRequired);

        if (confirmUuid) {
            this.inventoryMovementHelper.verifyConfirm(confirmUuid);
        }

        maintenance.dateEnd = new Date();
        await this.maintenanceService.update(maintenance.uuid, { dateEnd: maintenance.dateEnd } as any)
        const warehouseWorkshop = await this.warehouseRepository.findOne({ include: [{ model: WarehouseType, where: { key: 'workshop' } }] });
        if (!warehouseWorkshop)
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar la bodega de origen.');

        const warehouseWarehouse = await this.warehouseRepository.findOne({ include: [{ model: WarehouseType, where: { key: 'warehouse' } }] });
        if (!warehouseWarehouse)
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar la bodega de destino.');

        const measureUnit = await this.measureUnitRepository.findOne({ where: { condition: true } });
        if (!measureUnit)
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar la unidad de medida.');

        const movement = await this.inventoryMovementRepository.findOne({
            where: {
                warehouseOriginUuid: warehouseWorkshop.uuid,
                warehouseDetinyUuid: warehouseWarehouse.uuid,
                referenceSchema: 'billing',
                referenceTable: 'maintenance',
                referenceUuid: maintenance.uuid,
            }
        })
        if(!movement){
            this.inventoryMovementRepository.create({
                date: maintenance.dateEnd,
                amount: 1,
                warehouseOriginUuid: warehouseWorkshop.uuid,
                originUuid: warehouseWorkshop.uuid,
                warehouseDetinyUuid: warehouseWarehouse.uuid,
                destinyUuid: warehouseWarehouse.uuid,
                productUuid: maintenance.productUuid,
                measureUnitUuid: measureUnit.uuid,
                referenceSchema: 'billing',
                referenceTable: 'maintenance',
                referenceUuid: maintenance.uuid,
            }).catch((error) => console.log(error));
        }

        const details = maintenance.maintenanceSteps.map((step) => {
            return step.maintenanceStepDetails.map((detail) => {
                return {
                    productUuid: detail.productUuid,
                    amount: Number(detail.amount),
                    measureUnitUuid: detail.measureUnitUuid,
                    uuid: detail.uuid,
                }
            });
        }).flat();

        Promise.all(details.map(async (detail) => {
            await this.inventoryMovementRepository.update({ amount: detail.amount }, {
                where: {
                    referenceSchema: 'billing',
                    referenceTable: 'maintenance_step_detail',
                    referenceUuid: detail.uuid,
                }
            }).catch((error) => console.log(error));
        }));
        return true;
    }
}
import { Charge, ChargeDetail, ChargeDetailScheduled, ChargeStatus, Discharge, DischargeDetail, DischargeDetailScheduled, DischargeStatus, Measure, MeasureUnit, PriceCategory, Product, ProductMaintenanceStep, ProductMaintenanceStepDetail, ProductPrice, ProductType } from "../../../shared/domain/model/inventory"
import { InventoryMovement } from "../../../shared/domain/model/inventory/inventory-movement"

export const inventoryConnectionProvider = [
    { provide: 'PRODUCT_REPOSITORY', useValue: Product },
    { provide: 'PRODUCT_TYPE_REPOSITORY', useValue: ProductType },
    { provide: 'MEASURE_REPOSITORY', useValue: Measure },
    { provide: 'PRICE_CATEGORY_REPOSITORY', useValue: PriceCategory },
    { provide: 'PRODUCT_REPOSITORY', useValue: Product },
    { provide: 'MEASURE_UNIT_REPOSITORY', useValue: MeasureUnit },
    { provide: 'PRODUCT_PRICE_REPOSITORY', useValue: ProductPrice },
    { provide: 'PRODUCT_MAINTENANCE_STEP_REPOSITORY', useValue: ProductMaintenanceStep },
    { provide: 'PRODUCT_MAINTENANCE_STEP_DETAIL_REPOSITORY', useValue: ProductMaintenanceStepDetail },
    { provide: 'CHARGE_STATUS_REPOSITORY', useValue: ChargeStatus },
    { provide: 'CHARGE_REPOSITORY', useValue: Charge },
    { provide: 'CHARGE_DETAIL_SCHEDULED_REPOSITORY', useValue: ChargeDetailScheduled },
    { provide: 'CHARGE_DETAIL_REPOSITORY', useValue: ChargeDetail },
    { provide: 'DISCHARGE_STATUS_REPOSITORY', useValue: DischargeStatus },
    { provide: 'DISCHARGE_REPOSITORY', useValue: Discharge },
    { provide: 'DISCHARGE_DETAIL_SCHEDULED_REPOSITORY', useValue: DischargeDetailScheduled },
    { provide: 'DISCHARGE_DETAIL_REPOSITORY', useValue: DischargeDetail },
    { provide: 'INVENTORY_MOVEMENT_REPOSITORY', useValue: InventoryMovement },
]

export const inventoryModels = [
    Product,
    ProductType,
    Measure,
    PriceCategory,
    Product,
    MeasureUnit,
    ProductPrice,
    ProductMaintenanceStep,
    ProductMaintenanceStepDetail,
]
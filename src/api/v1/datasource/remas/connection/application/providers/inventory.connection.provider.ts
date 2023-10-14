import { Measure, MeasureUnit, PriceCategory, Product, ProductMaintenanceStep, ProductMaintenanceStepDetail, ProductPrice, ProductType } from "../../../shared/domain/model/inventory"

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
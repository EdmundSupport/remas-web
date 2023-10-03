import { Measure, MeasureUnit, PriceCategory, Product, ProductPrice, ProductType } from "../../../shared/domain/model/inventory"

export const inventoryConnectionProvider = [
    { provide: 'PRODUCT_TYPE_REPOSITORY', useValue: ProductType },
    { provide: 'MEASURE_REPOSITORY', useValue: Measure },
    { provide: 'PRICE_CATEGORY_REPOSITORY', useValue: PriceCategory },
    { provide: 'PRODUCT_REPOSITORY', useValue: Product },
    { provide: 'MEASURE_UNIT_REPOSITORY', useValue: MeasureUnit },
    { provide: 'PRODUCT_PRICE_REPOSITORY', useValue: ProductPrice },
]

export const inventoryModels = [
    ProductType,
    Measure,
    PriceCategory,
    Product,
    MeasureUnit,
    ProductPrice,
]
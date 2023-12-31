import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MeasureUnitModule } from './measure-unit/measure-unit.module';
import { ProductPriceModule } from './product-price/product-price.module';
import { PriceCategoryModule } from './price-category/price-category.module';
import { MeasureModule } from './measure/measure.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { ChargeModule } from './charge/charge.module';
import { DischargeModule } from './discharge/discharge.module';
import { InventoryMovementModule } from './inventory-movement/inventory-movement.module';

@Module({
    imports: [
        ProductModule,
        MeasureUnitModule,
        ProductPriceModule,
        PriceCategoryModule,
        MeasureModule,
        ProductTypeModule,
        ChargeModule,
        DischargeModule,
        InventoryMovementModule,
    ],
    exports: [
        ProductModule,
        MeasureUnitModule,
        ProductPriceModule,
        PriceCategoryModule,
        MeasureModule,
        ProductTypeModule,
        ChargeModule,
        DischargeModule,
        InventoryMovementModule,
    ]
})
export class InventoryModule { }
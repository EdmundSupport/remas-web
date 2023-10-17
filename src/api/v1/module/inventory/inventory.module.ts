import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MeasureUnitModule } from './measure-unit/measure-unit.module';
import { ProductPriceModule } from './product-price/product-price.module';
import { PriceCategoryModule } from './price-category/price-category.module';
import { MeasureModule } from './measure/measure.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { ChargeModule } from './charge/charge.module';

@Module({
    imports: [
        ProductModule,
        MeasureUnitModule,
        ProductPriceModule,
        PriceCategoryModule,
        MeasureModule,
        ProductTypeModule,
        ChargeModule,
    ],
    exports: [
        ProductModule,
        MeasureUnitModule,
        ProductPriceModule,
        PriceCategoryModule,
        MeasureModule,
        ProductTypeModule,
        ChargeModule,
    ]
})
export class InventoryModule { }
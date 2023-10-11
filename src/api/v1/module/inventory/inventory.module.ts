import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MeasureUnitModule } from './measure-unit/measure-unit.module';
import { ProductPriceModule } from './product-price/product-price.module';
import { PriceCategoryModule } from './price-category/price-category.module';

@Module({
    imports: [
        ProductModule,
        MeasureUnitModule,
        ProductPriceModule,
        PriceCategoryModule,
    ],
    exports: [
        ProductModule,
        MeasureUnitModule,
        ProductPriceModule,
        PriceCategoryModule,
    ]
})
export class InventoryModule { }
import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MeasureUnitModule } from './measure-unit/measure-unit.module';

@Module({
    imports: [
        ProductModule,
        MeasureUnitModule,
    ],
    exports: [
        ProductModule,
        MeasureUnitModule,
    ]
})
export class InventoryModule { }
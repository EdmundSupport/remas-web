import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { ProductPriceService } from './application/service/product-price.service';
import { ProductPriceController } from './infrastructure/controller/product-price.controller';

@Module({
    imports: [
        DatasourceModule,
    ],
    providers: [
        ProductPriceService,
    ],
    controllers: [
        ProductPriceController,
    ],
    exports: [
        ProductPriceService,
    ]
})
export class ProductPriceModule { }
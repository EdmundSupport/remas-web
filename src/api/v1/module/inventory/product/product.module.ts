import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { ProductService } from './application/service/product.service';
import { ProductController } from './infrastructure/controller/product.controller';

@Module({
    imports: [
        DatasourceModule,
    ],
    providers: [
        ProductService,
    ],
    controllers: [
        ProductController,
    ],
    exports: [
        ProductService,
    ]
})
export class ProductModule { }
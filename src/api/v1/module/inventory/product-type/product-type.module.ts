import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { ProductTypeService } from './application/service/product-type.service';
import { ProductTypeController } from './infrastructure/controller/product-type.controller';

@Module({
    imports: [
        DatasourceModule,
    ],
    providers: [
        ProductTypeService,
    ],
    controllers: [
        ProductTypeController,
    ],
    exports: [
        ProductTypeService,
    ]
})
export class ProductTypeModule { }
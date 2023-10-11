import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { PriceCategoryService } from './application/service/price-category.service';
import { PriceCategoryController } from './infrastructure/controller/price-category.controller';

@Module({
    imports: [
        DatasourceModule,
    ],
    providers: [
        PriceCategoryService,
    ],
    controllers: [
        PriceCategoryController,
    ],
    exports: [
        PriceCategoryService,
    ]
})
export class PriceCategoryModule { }
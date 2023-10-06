import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { QuotationController } from './infrastructure/controller/quotation.controller';
import { QuotationService } from './application/service';

@Module({
    imports: [
        DatasourceModule
    ],
    providers: [
        QuotationService,
    ],
    controllers: [
        QuotationController,
    ],
    exports: [
        QuotationService,
    ]
})
export class QuotationModule { }
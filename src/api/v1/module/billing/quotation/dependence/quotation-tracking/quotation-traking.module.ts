import { Module, forwardRef } from '@nestjs/common';
import { QuotationTrackingService } from './application/quotation-tracking.service';
import { QuotationTrackingController } from './infrastructure/controller/quotation_maintenance.controller';
import { DatasourceModule } from 'src/api/v1/datasource';
import { ModuleModule } from 'src/api/v1/module/module.module';

@Module({
    imports: [
        forwardRef(() => DatasourceModule),
        forwardRef(() => ModuleModule),
    ],
    providers: [
        QuotationTrackingService
    ],
    controllers: [
        QuotationTrackingController,
    ],
    exports: [
        QuotationTrackingService,
    ],
})
export class QuotationTrackingModule { }
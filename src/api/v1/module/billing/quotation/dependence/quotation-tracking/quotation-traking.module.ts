import { Module, forwardRef } from '@nestjs/common';
import { QuotationTrackingService } from './application/quotation-tracking.service';
import { QuotationTrackingController } from './infrastructure/controller/quotation_maintenance.controller';
import { DatasourceModule } from 'src/api/v1/datasource';
import { ModuleModule } from 'src/api/v1/module/module.module';
import { StructureHashTable } from 'shared/structure';

@Module({
    imports: [
        forwardRef(() => DatasourceModule),
        forwardRef(() => ModuleModule),
    ],
    providers: [
        QuotationTrackingService,
        {
            provide: 'QUOTATION_CONFIRM_TABLE',
            useClass: StructureHashTable,
        }
    ],
    controllers: [
        QuotationTrackingController,
    ],
    exports: [
        QuotationTrackingService,
    ],
})
export class QuotationTrackingModule { }
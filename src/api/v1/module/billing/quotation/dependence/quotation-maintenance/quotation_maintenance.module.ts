import { Module, forwardRef } from '@nestjs/common';
import { ModuleModule } from 'src/api/v1/module/module.module';
import { QuotationMaintenanceService } from './application/service/quotation-maintenance.service';
import { DatasourceModule } from 'src/api/v1/datasource';

@Module({
    imports: [
        forwardRef(() => DatasourceModule),
        forwardRef(() => ModuleModule)
    ],
    providers: [
        QuotationMaintenanceService,
    ],
    exports: [
        QuotationMaintenanceService,
    ]
})
export class QuotationMaintenanceModule { }
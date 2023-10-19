import { Module, forwardRef } from '@nestjs/common';
import { ModuleModule } from 'src/api/v1/module/module.module';
import { QuotationChargeService } from './application/service/quotation-charge.service';
import { DatasourceModule } from 'src/api/v1/datasource';

@Module({
    imports: [
        forwardRef(() => DatasourceModule),
        forwardRef(() => ModuleModule)
    ],
    providers: [
        QuotationChargeService,
    ],
    exports: [
        QuotationChargeService,
    ]
})
export class QuotationChargeModule { }
import { Module } from '@nestjs/common';
import { ClientModule } from './client';
import { QuotationModule } from './quotation/quotation.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { QuotationDependenceModule } from './quotation/dependence/quotation_dependence.module';

@Module({
    imports: [
        ClientModule,
        QuotationModule,
        QuotationDependenceModule,
        MaintenanceModule,
    ],
    exports: [
        ClientModule,
        QuotationModule,
        QuotationDependenceModule,
        MaintenanceModule,
    ]
})
export class BillingModule { }
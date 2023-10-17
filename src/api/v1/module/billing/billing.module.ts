import { Module } from '@nestjs/common';
import { ClientModule } from './client';
import { QuotationModule } from './quotation/quotation.module';
import { MaintenanceModule } from './maintenance/maintenance.module';

@Module({
    imports: [
        ClientModule,
        QuotationModule,
        MaintenanceModule,
    ],
    exports: [
        ClientModule,
        QuotationModule,
        MaintenanceModule,
    ]
})
export class BillingModule { }
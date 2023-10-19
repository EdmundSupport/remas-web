import { Module } from '@nestjs/common';
import { QuotationMaintenanceModule } from './quotation-maintenance/quotation_maintenance.module';
import { QuotationTrackingModule } from './quotation-tracking/quotation-traking.module';
import { QuotationChargeModule } from './quotation-charge/quotation-charge.module';

@Module({
    imports: [
        QuotationMaintenanceModule,
        QuotationChargeModule,
        QuotationTrackingModule,
    ],
    exports: [
        QuotationMaintenanceModule,
        QuotationChargeModule,
        QuotationTrackingModule,
    ],
})
export class QuotationDependenceModule { }
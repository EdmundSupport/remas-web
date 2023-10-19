import { Module } from '@nestjs/common';
import { QuotationMaintenanceModule } from './quotation-maintenance/quotation_maintenance.module';
import { QuotationTrackingModule } from './quotation-tracking/quotation-traking.module';

@Module({
    imports: [
        QuotationMaintenanceModule,
        QuotationTrackingModule,
    ],
    exports: [
        QuotationMaintenanceModule,
        QuotationTrackingModule,
    ],
})
export class QuotationDependenceModule { }
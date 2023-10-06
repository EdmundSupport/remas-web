import { Module } from '@nestjs/common';
import { ClientModule } from './client';
import { QuotationModule } from './quotation/quotation.module';

@Module({
    imports: [
        ClientModule,
        QuotationModule,
    ],
    exports: [
        ClientModule,
        QuotationModule,
    ]
})
export class BillingModule { }
import { Module } from '@nestjs/common';
import { ClientModule } from './client';

@Module({
    imports: [
        ClientModule,
    ],
    exports: [
        ClientModule,
    ]
})
export class BillingModule { }
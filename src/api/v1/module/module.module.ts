import { Module } from "@nestjs/common";
import { AAAModule } from "./aaa";
import { BillingModule } from "./billing";
@Module({
    imports: [
        AAAModule,
        BillingModule,
    ],
    exports: [
        AAAModule,
        BillingModule,
    ],
})
export class ModuleModule { }
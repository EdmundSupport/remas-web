import { Module } from "@nestjs/common";
import { AAAModule } from "./aaa";
import { BillingModule } from "./billing";
import { InventoryModule } from "./inventory/inventory.module";
@Module({
    imports: [
        AAAModule,
        BillingModule,
        InventoryModule,
    ],
    exports: [
        AAAModule,
        BillingModule,
        InventoryModule,
    ],
})
export class ModuleModule { }
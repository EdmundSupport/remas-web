import { Module } from "@nestjs/common";
import { AAAModule } from "./aaa";
import { BillingModule } from "./billing";
import { InventoryModule } from "./inventory/inventory.module";
import { StructureHashTable } from "shared/structure/application/hash/structure.hash_table";
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
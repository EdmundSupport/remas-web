import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { InventoryMovementService } from './application/service/inventory-movement.service';
import { InventoryMovementController } from './infrastructure/controller/inventory-movement.controller';
import { InventoryMovementHelper } from './application/helper/inventory-movement.helper';
import { StructureHashTable } from 'shared/structure';

@Module({
    imports: [
        DatasourceModule,
    ],
    providers: [
        InventoryMovementService,
        InventoryMovementHelper,
        {
            provide: 'INVENTORY_CONFIRM_HASH_TABLE',
            useClass: StructureHashTable,
        }
    ],
    controllers: [
        InventoryMovementController,
    ],
    exports: [
        InventoryMovementService,
        InventoryMovementHelper,
    ]
})
export class InventoryMovementModule { }
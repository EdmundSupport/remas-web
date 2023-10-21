import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { InventoryMovementService } from './application/service/inventory-movement.service';
import { InventoryMovementController } from './infrastructure/controller/inventory-movement.controller';

@Module({
    imports: [
        DatasourceModule,
    ],
    providers: [
        InventoryMovementService,
    ],
    controllers: [
        InventoryMovementController,
    ],
    exports: [
        InventoryMovementService,
    ]
})
export class InventoryMovementModule { }
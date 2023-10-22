import { Body, Controller, Delete, Get, Headers, Param, ParseArrayPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { MeasureUnitDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/measure-unit.dto";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";
import { InventoryMovementService } from "../../application/service/inventory-movement.service";
import { InventoryMovementDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/inventory-movement.dto";

@ApiTags('Movimientos de Inventarios')
@Controller({
    path: 'inventory-movement'
})
export class InventoryMovementController {
    constructor(
        private inventoryMovementService: InventoryMovementService,
    ) { }

    @Get('/product/:uuid')
    stock(@Param('uuid', NewOrUUIDValidationPipe) uuid: string){
        return this.inventoryMovementService.stock(uuid);
    }


}
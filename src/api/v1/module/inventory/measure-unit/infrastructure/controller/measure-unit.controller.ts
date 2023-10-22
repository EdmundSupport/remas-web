import { Body, Controller, Delete, Get, Headers, Param, ParseArrayPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MeasureUnitService } from "../../application/service/measure-unit.service";
import { MeasureUnitDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/measure-unit.dto";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";

@ApiTags('Unidades de Medida')
@Controller({
    path: 'measure-unit'
})
export class MeasureUnitController {
    constructor(
        private measureUnitService: MeasureUnitService,
    ) { }

    @Get()
    findAll(@Query() data: MeasureUnitDto) {
        return this.measureUnitService.findAll(data);
    }

    @Get('/:uuid')
    findOne(@Param('uuid', NewOrUUIDValidationPipe) uuid: string) {
        return this.measureUnitService.findOne(uuid);
    }
}
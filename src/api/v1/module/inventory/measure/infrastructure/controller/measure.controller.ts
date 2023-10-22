import { Body, Controller, Delete, Get, Headers, ParseArrayPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MeasureService } from "../../application/service/measure.service";
import { MeasureDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/measure.dto";

@ApiTags('Medida')
@Controller({
    path: 'measure'
})
export class MeasureController {
    constructor(
        private measureService: MeasureService,
    ) { }

    @Get()
    findAll(@Query() data: MeasureDto) {
        return this.measureService.findAll(data);
    }
}
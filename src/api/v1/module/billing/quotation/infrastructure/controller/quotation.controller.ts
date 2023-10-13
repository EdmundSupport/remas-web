import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from "@nestjs/common";
import { QuotationService } from "../../application/service";
import { ApiTags } from "@nestjs/swagger";
import { CreateQuotationDto } from "../../domain/dto/create-quotation.dto";
import { QuotationDto } from "src/api/v1/datasource/remas/shared/domain/dto/quotation.dto";
import { FindQuotationDto } from "../../domain/dto/find-quotation.dto";

@ApiTags('Cotizaciones')
@Controller({
    path: 'quotation'
})
export class QuotationController {
    constructor(
        private quotationService: QuotationService
    ) { }

    @Post()
    create(@Body() data: CreateQuotationDto) {
        return this.quotationService.create(data);
    }

    @Get()
    findAll(@Query() data: FindQuotationDto) {
        return this.quotationService.findAll(data);
    }

    @Get('/:uuid')
    findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.quotationService.findOne(uuid);
    }
}
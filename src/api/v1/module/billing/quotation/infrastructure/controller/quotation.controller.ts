import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { QuotationService } from "../../application/service";
import { ApiTags } from "@nestjs/swagger";
import { CreateDto, FindDto } from "../../domain/dto/quotation.dto";

@ApiTags('Cotizaciones')
@Controller({
    path: 'quotation'
})
export class QuotationController {
    constructor(
        private quotationService: QuotationService
    ) { }

    @Post()
    create(@Body() data: CreateDto) {
        return this.quotationService.create(data);
    }

    @Get()
    findAll(@Query() data: FindDto) {
        return this.quotationService.findAll(data);
    }
}
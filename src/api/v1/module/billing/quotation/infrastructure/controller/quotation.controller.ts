import { Body, Controller, Post } from "@nestjs/common";
import { QuotationService } from "../../application/service";
import { ApiTags } from "@nestjs/swagger";
import { CreateDto } from "../../domain/dto/quotation.dto";

@ApiTags('Cotizaciones')
@Controller({
    path: 'quotation'
})
export class QuotationController {
    constructor(
        private quotationService: QuotationService
    ) { }

    @Post()
    create(@Body() data: CreateDto){
        return this.quotationService.create(data);
    }
}
import { Body, Controller, Delete, Get, Headers, ParseArrayPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PriceCategoryService } from "../../application/service/price-category.service";
import { PriceCategoryDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/price-category.dto";

@ApiTags('Unidades de Medida')
@Controller({
    path: 'price-category'
})
export class PriceCategoryController {
    constructor(
        private productPriceService: PriceCategoryService,
    ) { }

    @Get()
    findAll(@Query() data: PriceCategoryDto) {
        return this.productPriceService.findAll(data);
    }
}
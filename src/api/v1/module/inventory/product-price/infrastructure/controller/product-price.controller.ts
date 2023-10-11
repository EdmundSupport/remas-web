import { Body, Controller, Delete, Get, Headers, ParseArrayPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductPriceService } from "../../application/service/product-price.service";
import { ProductPriceDto } from "src/api/v1/datasource/remas/shared/domain/dto/product-price.dto";

@ApiTags('Unidades de Medida')
@Controller({
    path: 'product-price'
})
export class ProductPriceController {
    constructor(
        private productPriceService: ProductPriceService,
    ) { }

    @Get()
    findAll(@Query() data: ProductPriceDto) {
        return this.productPriceService.findAll(data);
    }
}
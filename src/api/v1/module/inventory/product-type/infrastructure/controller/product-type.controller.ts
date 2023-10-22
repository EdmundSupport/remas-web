import { Body, Controller, Delete, Get, Headers, ParseArrayPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductTypeService } from "../../application/service/product-type.service";
import { ProductTypeDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/product-type.dto";

@ApiTags('Medida')
@Controller({
    path: 'product-type'
})
export class ProductTypeController {
    constructor(
        private productTypeService: ProductTypeService,
    ) { }

    @Get()
    findAll(@Query() data: ProductTypeDto) {
        return this.productTypeService.findAll(data);
    }
}
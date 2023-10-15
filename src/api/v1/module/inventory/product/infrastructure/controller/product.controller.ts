import { Body, Controller, Delete, Get, Headers, Param, ParseArrayPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductService } from "../../application/service/product.service";
import { ProductDto } from "src/api/v1/datasource/remas/shared/domain/dto/product.dto";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";

@ApiTags('Productos')
@Controller({
    path: 'product'
})
export class ProductController {
    constructor(
        private productService: ProductService,
    ) { }

    @Get()
    findAll(@Query() data: ProductDto) {
        return this.productService.findAll(data);
    }

    @Get('/:uuid')
    findOne(@Param('uuid', NewOrUUIDValidationPipe) uuid: string) {
        return this.productService.findOne(uuid);
    }
}
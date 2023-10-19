import { Body, Controller, Delete, Get, Headers, Param, ParseArrayPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductService } from "../../application/service/product.service";
import { ProductDto } from "src/api/v1/datasource/remas/shared/domain/dto/product.dto";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";
import { CreateProductDto } from "../../domain/dto/create-product.dto";

@ApiTags('Productos')
@Controller({
    path: 'product'
})
export class ProductController {
    constructor(
        private productService: ProductService,
    ) { }

    @Post()
    create(@Body() data: CreateProductDto) {
        return this.productService.create(data);
    }

    @Get('/:uuid')
    findOne(@Param('uuid', NewOrUUIDValidationPipe) uuid: string) {
        console.log("🚀 ~ file: product.controller.ts:29 ~ ProductController ~ findOne ~ uuid:", uuid)
        return this.productService.findOne(uuid);
    }
    
    @Get()
    findAll(@Query() data: ProductDto) {
        return this.productService.findAll(data);
    }

    
    @Patch('/:uuid')
    update(@Param('uuid', NewOrUUIDValidationPipe) uuid: string, @Body() data: CreateProductDto) {
        return this.productService.update(uuid, data);
    }
}
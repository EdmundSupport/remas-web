import { IsBoolean, IsOptional, IsString, IsArray, IsDate, IsObject, ValidateNested } from "class-validator";
import { ProductPriceDto } from "./product-price.dto";
import { ProductDto } from "./product.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";
import { Type } from "class-transformer";

export class PriceCategoryDto {

    @IsOptional()
    @IsString()
    uuid?: string;

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsBoolean()
    condition?: boolean;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @IsOptional()
    @IsArray()
    @Type(()=>ProductPriceDto)
    productPrices?: ProductPriceDto[];

    @IsOptional()
    @IsArray()
    products?: ProductDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
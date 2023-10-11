import { IsBoolean, IsOptional, IsString, IsArray, IsDate } from "class-validator";
import { ProductPriceDto } from "./product-price.dto";
import { ProductDto } from "./product.dto";

export class PriceCategoryDto{

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
    productPrices?: ProductPriceDto[];

    @IsOptional()
    @IsArray()
    products?: ProductDto[];
}
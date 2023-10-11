import { IsBoolean, IsDate, IsObject, IsOptional, IsString } from "class-validator";
import { MeasureUnitDto } from "./measure-unit.dto";
import { ProductDto } from "./product.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";
import { PriceCategoryDto } from "./price-category.dto";

export class ProductPriceDto {
    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    amount: string;

    @IsOptional()
    @IsString()
    productUuid: string;

    @IsOptional()
    @IsString()
    measureUnitUuid: string;

    @IsOptional()
    @IsString()
    priceCategoryUuid: string;

    @IsBoolean()
    @IsOptional()
    condition: boolean;

    @IsDate()
    @IsOptional()
    createdAt: Date;

    @IsDate()
    @IsOptional()
    updatedAt: Date;

    @IsOptional()
    @IsObject()
    product: ProductDto;

    @IsOptional()
    @IsObject()
    measureUnit: MeasureUnitDto;

    @IsOptional()
    @IsObject()
    priceCategory: PriceCategoryDto;

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
import { IsArray, IsBoolean, IsDate, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { MeasureDto } from "./measure.dto";
import { ProductPriceDto } from "./product-price.dto";
import { PaginationDto } from "src/api/v1/module";

export class MeasureUnitDto {

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    keyName: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    factorConversion: number;

    @IsOptional()
    @IsString()
    parentUuid: string;

    @IsOptional()
    @IsString()
    measureUuid: string;

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
    measure: MeasureDto;

    @IsOptional()
    @IsArray()
    measuresUnit: MeasureUnitDto[];

    @IsOptional()
    @IsObject()
    measureUnit: MeasureUnitDto;

    @IsOptional()
    @IsArray()
    productPrices: ProductPriceDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
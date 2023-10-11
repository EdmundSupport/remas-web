import { IsBoolean, IsOptional, IsString, IsDate, IsArray, ValidateNested, IsObject } from "class-validator";
import { MeasureDto } from "./measure.dto";
import { ProductTypeDto } from "./product-type.dto";
import { Type } from "class-transformer";
import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class ProductDto {
        @IsString()
        @IsOptional()
        uuid: string;

        @IsString()
        @IsOptional()
        sku: string;

        @IsString()
        @IsOptional()
        name: string;

        @IsString()
        @IsOptional()
        description: string;

        @IsString()
        @IsOptional()
        parentUuid: string;

        @IsString()
        @IsOptional()
        measureUuid: string;

        @IsString()
        @IsOptional()
        productTypeUuid: string;

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
        @IsArray()
        productChild: ProductDto[];

        @IsOptional()
        @IsObject()
        productParent: ProductDto;

        @IsOptional()
        @IsObject()
        measure: MeasureDto;

        @IsOptional()
        @IsObject()
        productType: ProductTypeDto;

        @IsOptional()
        @IsObject()
        pagination: PaginationDto;
}
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";
import { ProductDto } from "./product.dto";

export class ProductTypeDto {
    @IsString()
    @IsOptional()
    uuid: string;

    @IsString()
    @IsOptional()
    keyName: string;

    @IsString()
    @IsOptional()
    name: string;

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
    products: ProductDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
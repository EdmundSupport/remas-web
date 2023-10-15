import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString } from "class-validator";
import { ProductDto } from "./product.dto";
import { MeasureUnitDto } from "./measure-unit.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";

export class MeasureDto {
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
    @IsArray()    
    measureUnits: MeasureUnitDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
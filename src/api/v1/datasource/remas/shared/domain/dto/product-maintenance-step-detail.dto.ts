import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ProductDto } from "./product.dto";
import { MeasureUnitDto } from "./measure-unit.dto";
import { ProductMaintenanceStepDto } from "./product-maintenance-step.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";
import { Type } from "class-transformer";

export class ProductMaintenanceStepDetailDto {

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    amount: string;

    @IsOptional()
    @IsString()
    price: string;

    @IsOptional()
    @IsString()
    productMaintenanceStepUuid: string;

    @IsOptional()
    @IsString()
    productUuid: string;

    @IsOptional()
    @IsString()
    measureUnitUuid: string;

    @IsOptional()
    @IsBoolean()
    condition: boolean;

    @IsOptional()
    @IsDate()
    createdAt: Date;

    @IsOptional()
    @IsDate()
    updatedAt: Date;

    @IsOptional()
    @IsObject()
    product: ProductDto;

    @IsOptional()
    @IsObject()
    measureUnit: MeasureUnitDto;

    @IsOptional()
    @IsObject()
    productMaintenanceStep: ProductMaintenanceStepDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>ProductMaintenanceStepDetailDto)
    productMaintenanceStepDetails: ProductMaintenanceStepDetailDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
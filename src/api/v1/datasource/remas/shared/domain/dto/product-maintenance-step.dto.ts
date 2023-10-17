import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ProductDto } from "./product.dto";
import { ProductMaintenanceStepDetailDto } from "./product-maintenance-step-detail.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";
import { MaintenanceStepDto } from "./maintenance-step.dto";
import { Type } from "class-transformer";

export class ProductMaintenanceStepDto {

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    order: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    productUuid: string;

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
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>ProductMaintenanceStepDetailDto)
    productMaintenanceStepDetails: ProductMaintenanceStepDetailDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>MaintenanceStepDto)
    maintenanceSteps: MaintenanceStepDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
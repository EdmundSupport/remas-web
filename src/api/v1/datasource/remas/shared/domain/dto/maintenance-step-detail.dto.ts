import { IsBoolean, IsDate, IsObject, IsOptional, IsString } from "class-validator";
import { MaintenanceStepDto } from "./maintenance-step.dto";
import { ProductDto } from "./product.dto";
import { MeasureUnitDto } from "./measure-unit.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";
import { ProductMaintenanceStepDetailDto } from "./product-maintenance-step-detail.dto";

export class MaintenanceStepDetailDto{
    
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
    maintenanceStepUuid: string;
    
    @IsOptional()
    @IsString()
    productMaintenanceStepDetailUuid: string;
    
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
    maintenanceStep: MaintenanceStepDto;
    
    @IsOptional()
    @IsObject()
    productMaintenanceStepDetails: ProductMaintenanceStepDetailDto;
    
    @IsOptional()
    @IsObject()
    MeasureUnit: MeasureUnitDto;

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
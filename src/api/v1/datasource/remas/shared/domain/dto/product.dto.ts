import { IsBoolean, IsOptional, IsString, IsDate, IsArray, ValidateNested, IsObject, Validate } from "class-validator";
import { MeasureDto } from "./measure.dto";
import { ProductTypeDto } from "./product-type.dto";
import { Type } from "class-transformer";
import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
import { ProductPriceDto } from "./product-price.dto";
import { PriceCategoryDto } from "./price-category.dto";
import { ProductMaintenanceStepDto } from "./product-maintenance-step.dto";
import { ProductMaintenanceStepDetailDto } from "./product-maintenance-step-detail.dto";
export class ProductDto {
        
        @IsOptional()
        @IsString()
        uuid?: string;
        
        @IsOptional()
        @IsString()
        sku?: string;
        
        @IsOptional()
        @IsString()
        name?: string;
        
        @IsOptional()
        @IsString()
        description?: string;
        
        @IsOptional()
        @IsString()
        parentUuid?: string;
        
        @IsOptional()
        @IsString()
        measureUuid?: string;
        
        @IsOptional()
        @IsString()
        productTypeUuid?: string;
        
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
        products?: ProductDto[];
        
        @IsOptional()
        @IsObject()
        product?: ProductDto;
        
        @IsOptional()
        @IsObject()
        measure?: MeasureDto;
        
        @IsOptional()
        @IsObject()
        productType?: ProductTypeDto;
        
        @IsOptional()
        @IsArray()
        productPrices?: ProductPriceDto[];
        
        @IsOptional()
        @IsObject()
        priceCategories?: PriceCategoryDto[];
        
        @IsOptional()
        @IsArray()
        @ValidateNested({each: true})
        @Type(()=>ProductMaintenanceStepDto)
        productMaintenanceSteps?: ProductMaintenanceStepDto[];
        
        @IsOptional()
        @IsArray()
        productMaintenanceStepDetails?: ProductMaintenanceStepDetailDto[];

        @IsOptional()
        @IsObject()
        pagination: PaginationDto;
}
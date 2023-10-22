import { OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Uuid } from "shared/validation/infrastructure/decoration/uuid.decoration";
import { ProductMaintenanceStepDetailDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/product-maintenance-step-detail.dto";
import { ProductMaintenanceStepDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/product-maintenance-step.dto";
import { ProductDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/product.dto";

export class CreateProductMaintenanceStepDetailsDto extends PartialType(OmitType(ProductMaintenanceStepDetailDto, ['amount', 'productUuid', 'measureUnitUuid'])) {
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    productUuid: string;

    @IsNotEmpty()
    @IsString()
    measureUnitUuid: string;
}

export class CreateProductMaintenanceStepDto extends PartialType(OmitType(ProductMaintenanceStepDto, ['order', 'description', 'productUuid', 'productMaintenanceStepDetails'])) {
    @IsNotEmpty()
    @IsNumber()
    order: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    productUuid: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(()=>CreateProductMaintenanceStepDetailsDto)
    productMaintenanceStepDetails: CreateProductMaintenanceStepDetailsDto[];
}

export class CreateProductDto extends PartialType(OmitType(ProductDto, ['sku', 'name', 'description', 'productMaintenanceSteps'])) {
    @IsNotEmpty()
    @IsString()
    sku: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => CreateProductMaintenanceStepDto)
    productMaintenanceSteps: CreateProductMaintenanceStepDto[];
}
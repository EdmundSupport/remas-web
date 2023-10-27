import { OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Uuid } from "shared/validation/infrastructure/decoration/uuid.decoration";
import { ProductMaintenanceStepDetailDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/product-maintenance-step-detail.dto";
import { ProductMaintenanceStepDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/product-maintenance-step.dto";
import { ProductPackageDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/product-package.dto";
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

export class CreateProductMaintenanceStepDto extends PartialType(OmitType(ProductMaintenanceStepDto, ['order', 'description', 'productMaintenanceStepDetails'])) {
    @IsNotEmpty()
    @IsNumber()
    order: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => CreateProductMaintenanceStepDetailsDto)
    productMaintenanceStepDetails: CreateProductMaintenanceStepDetailsDto[];
}

export class CreateProductPackageDto extends PartialType(OmitType(ProductPackageDto, ['description', 'amount', 'price', 'productUuid', 'measureUnitUuid', 'priceCategoryUuid'])) {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    amount: string;

    @IsNotEmpty()
    @IsString()
    price: string;

    @IsNotEmpty()
    @IsString()
    productUuid: string;

    @IsNotEmpty()
    @IsString()
    measureUnitUuid: string;

    @IsNotEmpty()
    @IsString()
    priceCategoryUuid: string;
}

export class CreateProductDto extends PartialType(OmitType(ProductDto, ['sku', 'name', 'description', 'productMaintenanceSteps', 'productPackages'])) {
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

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => CreateProductPackageDto)
    productPackages: CreateProductPackageDto[];
}
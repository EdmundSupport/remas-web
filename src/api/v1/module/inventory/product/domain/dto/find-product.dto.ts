import { OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { IsStringOrArray } from "shared/validation/infrastructure/decoration/is-string-or-array.decoration";
import { Uuid } from "shared/validation/infrastructure/decoration/uuid.decoration";
import { ProductMaintenanceStepDetailDto } from "src/api/v1/datasource/remas/shared/domain/dto/product-maintenance-step-detail.dto";
import { ProductMaintenanceStepDto } from "src/api/v1/datasource/remas/shared/domain/dto/product-maintenance-step.dto";
import { ProductDto } from "src/api/v1/datasource/remas/shared/domain/dto/product.dto";

export class FindProductMaintenanceStepDetailsDto extends PartialType(ProductMaintenanceStepDetailDto) {
}

export class FindProductMaintenanceStepDto extends PartialType(OmitType(ProductMaintenanceStepDto, ['productMaintenanceStepDetails'])) {
    @IsOptional()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(()=>FindProductMaintenanceStepDetailsDto)
    productMaintenanceStepDetails: FindProductMaintenanceStepDetailsDto[];
}

export class FindProductDto extends PartialType(OmitType(ProductDto, ['uuid', 'productMaintenanceSteps'])) {
    @IsOptional()
    @IsStringOrArray()
    uuid: string | string[];

    @IsOptional()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => FindProductMaintenanceStepDto)
    productMaintenanceSteps: FindProductMaintenanceStepDto[];
}
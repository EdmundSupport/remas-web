import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { MaintenanceStatusDto } from "./maintenance-status.dto";
import { MaintenanceStepDto } from "./maintenance-step.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";
import { ProductDto } from "./product.dto";

export class MaintenanceDto{

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    number: string;

    @IsOptional()
    @IsDate()
    dateStartScheduled: Date;

    @IsOptional()
    @IsDate()
    dateEndScheduled: Date;

    @IsOptional()
    @IsDate()
    dateStart: Date;

    @IsOptional()
    @IsDate()
    dateEnd: Date;

    @IsOptional()
    @IsString()
    userUuid: string;

    @IsOptional()
    @IsString()
    productUuid: string;

    @IsOptional()
    @IsString()
    maintenanceStatusUuid: string;

    @IsOptional()
    @IsBoolean()
    condition: boolean;

    @IsOptional()
    @IsDate()
    createdAt: Date;

    @IsOptional()
    @IsDate()
    updatedAt: Date;

    // TODO crear dto de user
    // @IsOptional()
    // @IsObject()
    // User: UserDto;

    @IsOptional()
    @IsObject()
    Product: ProductDto;

    @IsOptional()
    @IsObject()
    maintenanceStatus: MaintenanceStatusDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>MaintenanceStepDto)
    maintenanceSteps: MaintenanceStepDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
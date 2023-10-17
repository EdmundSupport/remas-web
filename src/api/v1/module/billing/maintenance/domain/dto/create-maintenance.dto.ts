import { OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsArray, IsString, IsDate, ValidateNested, IsNumber } from "class-validator";
import { MaintenanceStepDetailDto } from "src/api/v1/datasource/remas/shared/domain/dto/maintenance-step-detail.dto";
import { MaintenanceStepDto } from "src/api/v1/datasource/remas/shared/domain/dto/maintenance-step.dto";
import { MaintenanceDto } from "src/api/v1/datasource/remas/shared/domain/dto/maintenance.dto";

export class CreateMaintenanceStepDetailDto extends PartialType(OmitType(MaintenanceStepDetailDto, ['amount','price','productMaintenanceStepDetailUuid','measureUnitUuid'])){
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    productMaintenanceStepDetailUuid: string;

    @IsNotEmpty()
    @IsString()
    measureUnitUuid: string;
}

export class CreateMaintenanceStepDto extends PartialType(OmitType(MaintenanceStepDto, ['productMaintenanceStepUuid','maintenanceStepDetails'])){
    @IsNotEmpty()
    @IsString()
    productMaintenanceStepUuid: string

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>CreateMaintenanceStepDetailDto)
    maintenanceStepDetails: CreateMaintenanceStepDetailDto[];
}

export class CreateMaintenanceDto extends PartialType(OmitType(MaintenanceDto, ['number', 'dateStartScheduled', 'dateEndScheduled', 'dateStart', 'dateEnd', 'productUuid', 'maintenanceSteps'])) {
    @IsNumber()
    number: number;

    @IsNotEmpty()
    @IsDate()
    dateStartScheduled: Date;

    @IsNotEmpty()
    @IsDate()
    dateEndScheduled: Date;

    @IsNotEmpty()
    @IsDate()
    dateStart: Date;

    @IsNotEmpty()
    @IsDate()
    dateEnd: Date;

    @IsNotEmpty()
    @IsString()
    productUuid: string

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>CreateMaintenanceStepDto)
    maintenanceSteps: CreateMaintenanceStepDto[];
}
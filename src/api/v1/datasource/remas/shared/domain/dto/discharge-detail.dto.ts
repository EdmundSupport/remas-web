import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { DischargeDto } from "./discharge.dto";
import { ProductDto } from "./product.dto";
import { MeasureUnitDto } from "./measure-unit.dto";
import { Type } from "class-transformer";
import { DischargeDetailScheduledDto } from "./discharge-detail-scheduled.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";

export class DischargeDetailDto{

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    dischargeDetailScheduledUuid: string;

    @IsOptional()
    @IsString()
    amount: string;

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
    discharge: DischargeDto;

    @IsOptional()
    @IsObject()
    measureUnit: MeasureUnitDto;

    @IsOptional()
    @IsObject()
    dischargeDetailScheduled: DischargeDetailScheduledDto;

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ChargeDto } from "./charge.dto";
import { ProductDto } from "./product.dto";
import { MeasureUnitDto } from "./measure-unit.dto";
import { Type } from "class-transformer";
import { ChargeDetailScheduledDto } from "./charge-detail-scheduled.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";

export class ChargeDetailDto{

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    chargeDetailScheduledUuid: string;

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
    charge: ChargeDto;

    @IsOptional()
    @IsObject()
    measureUnit: MeasureUnitDto;
    

    @IsOptional()
    @IsObject()
    chargeDetailScheduled: ChargeDetailScheduledDto;

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
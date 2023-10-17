import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ChargeDto } from "./charge.dto";
import { ProductDto } from "./product.dto";
import { MeasureUnitDto } from "./measure-unit.dto";
import { Type } from "class-transformer";
import { ChargeDetailDto } from "./charge-detail.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";

export class ChargeDetailScheduledDto{

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    chargeUuid: string;

    @IsOptional()
    @IsString()
    amount: string;

    @IsOptional()
    @IsString()
    productUuid: string;

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
    product: ProductDto;

    @IsOptional()
    @IsObject()
    measureUnit: MeasureUnitDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>ChargeDetailDto)
    chargeDetails: ChargeDetailDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
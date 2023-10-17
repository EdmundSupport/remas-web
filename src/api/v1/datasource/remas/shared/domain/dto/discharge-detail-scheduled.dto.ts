import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { DischargeDto } from "./discharge.dto";
import { ProductDto } from "./product.dto";
import { MeasureUnitDto } from "./measure-unit.dto";
import { Type } from "class-transformer";
import { DischargeDetailDto } from "./discharge-detail.dto";

export class DischargeDetailScheduledDto{

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    dischargeUuid: string;

    @IsOptional()
    @IsString()
    amount: string;

    @IsOptional()
    @IsString()
    price: string;

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
    discharge: DischargeDto;

    @IsOptional()
    @IsObject()
    product: ProductDto;

    @IsOptional()
    @IsObject()
    measureUnit: MeasureUnitDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>DischargeDetailDto)
    dischargeDetails: DischargeDetailDto[];
}
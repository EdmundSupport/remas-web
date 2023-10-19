import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString } from "class-validator";
import { Quotation } from "../model/billing";
import { Type } from "class-transformer";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";
import { QuotationDto } from "./quotation.dto";
import { TributeDto } from "./tribute.dto";

export class ClientDto {

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    tributeUuid: string;

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
    @IsArray()
    @Type(()=>QuotationDto)
    quotations: QuotationDto[];

    @IsOptional()
    @IsObject()
    tribute: TributeDto;

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
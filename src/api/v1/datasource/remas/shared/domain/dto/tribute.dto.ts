import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString, IsArray, IsObject } from "class-validator";
import { ClientDto } from "./client.dto";
import { CompanyDto } from "./company.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";

export class TributeDto{

    @IsOptional()
    @IsString()
    uuid?: string;

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsString()
    countryUuid?: string;

    @IsOptional()
    @IsBoolean()
    condition?: boolean;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @IsOptional()
    @IsArray()
    @Type(()=>CompanyDto)
    companies?: CompanyDto[];

    @IsOptional()
    @IsArray()
    @Type(()=>ClientDto)
    clients?: ClientDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
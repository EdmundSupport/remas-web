import { IsString, IsOptional, IsBoolean, IsDate, IsObject } from "class-validator";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";

export class QuotationStatusDto{
    @IsString()
    @IsOptional()
    uuid: string;

    @IsString()
    @IsOptional()
    keyName: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsBoolean()
    @IsOptional()
    condition: boolean;

    @IsDate()
    @IsOptional()
    createdAt: Date;

    @IsDate()
    @IsOptional()
    updatedAt: Date;

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
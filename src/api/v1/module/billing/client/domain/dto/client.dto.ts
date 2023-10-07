import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    tributeCode: string;
}



export class PaginationDto {
    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsNumber()
    offset?: number;
}
class CompaniesDto {
    @IsOptional()
    @IsString()
    name: string;
}

class TributesDto {
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => CompaniesDto)
    companies: CompaniesDto;
}

export class FindDto {
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TributesDto)
    tributes: TributesDto;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => PaginationDto)
    pagination: PaginationDto;
}


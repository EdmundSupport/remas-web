import { Type } from "class-transformer";
import { IsArray, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { MaintenanceDto } from "./maintenance.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";

export class MaintenanceStatusDto{

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    keyName: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    condition: boolean;

    @IsOptional()
    @IsString()
    createdAt: Date;

    @IsOptional()
    @IsString()
    updatedAt: Date;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>MaintenanceDto)
    maintenances: MaintenanceDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
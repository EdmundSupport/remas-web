import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { DischargeDto } from "./discharge.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";

export class DischargeStatusDto{
    
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
    
    @IsString()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>DischargeDto)
    discharges: DischargeDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
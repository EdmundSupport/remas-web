import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ChargeDto } from "./charge.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";

export class ChargeStatusDto{
    
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
    @Type(()=>ChargeDto)
    charges: ChargeDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
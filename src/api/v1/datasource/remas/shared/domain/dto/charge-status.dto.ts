import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsOptional, IsString, ValidateNested } from "class-validator";
import { ChargeDto } from "./charge.dto";

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
}
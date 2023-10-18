import { IsArray, IsBoolean, IsDate, IsOptional, IsString, ValidateNested } from "class-validator";
import { PermissionDto } from "./permission.dto";
import { ModuleDto } from "./module.dto";
import { Type } from "class-transformer";

export class PrivilegeDto{

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
    @ValidateNested({each: true})
    @Type(()=>ModuleDto)
    modules: ModuleDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>PermissionDto)
    permissions: PermissionDto[];
}
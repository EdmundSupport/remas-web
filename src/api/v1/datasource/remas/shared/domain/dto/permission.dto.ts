import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { RoleDto } from "./role.dto";
import { RolePermissionDto } from "./role-permission.dto";
import { PaginationDto } from "src/api/v1/module";
import { ModuleDto } from "./module.dto";
import { PrivilegeDto } from "./privilege.dto";

export class PermissionDto{

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    keyName: string;

    @IsOptional()
    @IsString()
    moduleUuid: string;

    @IsOptional()
    @IsString()
    privilegeUuid: string;

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
    module: ModuleDto;

    @IsOptional()
    @IsObject()
    privilege: PrivilegeDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>RoleDto)
    roles: RoleDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>RolePermissionDto)
    rolePermissions: RolePermissionDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}
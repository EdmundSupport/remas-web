import { OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { RolePermissionDto } from "src/api/v1/datasource/remas/shared/domain/dto/role-permission.dto";
import { RoleDto } from "src/api/v1/datasource/remas/shared/domain/dto/role.dto";

export class CreateRolePermissionDto extends PartialType(OmitType(RolePermissionDto,['permissionUuid','condition'])){
    @IsNotEmpty()
    @IsString()
    permissionUuid: string;

    @IsNotEmpty()
    @IsBoolean()
    condition: boolean;
}

export class CreateRoleDto extends PartialType(OmitType(RoleDto,['keyName','name','rolePermissions'])){
    @IsNotEmpty()
    @IsString()
    keyName: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>CreateRolePermissionDto)
    rolePermissions: CreateRolePermissionDto[]
}
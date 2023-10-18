import { RolePermissionInterface } from "src/app/datasource/remas/domain/interface/role-permission.interface";
import { RoleInterface } from "./role.interface";

export interface CreateRolePermissionInterface extends Partial<Omit<RolePermissionInterface, 'roleUuid' | 'permissionUuid' | 'condition'>> {
    roleUuid: string;

    permissionUuid: string;

    condition: string;
}

export interface CreateRoleInterface extends Partial<Omit<RoleInterface, 'keyName' | 'name' | 'rolePermissions'>> {
    keyName: string;

    name: string;

    rolePermissions: CreateRolePermissionInterface[]
}
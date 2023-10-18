import { UserInterface } from "./user.interface";
import { PermissionInterface } from "./permission.interface";
import { RolePermissionInterface } from "./role-permission.interface";
import { PaginationInterface } from "./pagination.interface";

export interface RoleInterface{

            uuid: string;

            keyName: string;

            name: string;

            condition: boolean;

            createdAt: Date;

            updatedAt: Date;

                    users: UserInterface[];

                    permissions: PermissionInterface[];

                    rolePermissions: RolePermissionInterface[];

            pagination: PaginationInterface;
}
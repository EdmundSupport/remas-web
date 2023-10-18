import { PaginationInterface } from "./pagination.interface";
import { PermissionInterface } from "./permission.interface";
import { PrivilegeInterface } from "./privilege.interface";

export interface ModuleInterface{

            uuid: string;

            keyName: string;

            name: string;

            condition: boolean;

            createdAt: Date;

            updatedAt: Date;

                    privileges: PrivilegeInterface[];

                    permissions: PermissionInterface[];

            pagination: PaginationInterface;
}
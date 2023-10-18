import { PermissionInterface } from "./permission.interface";
import { ModuleInterface } from "./module.interface";

export interface PrivilegeInterface {

        uuid: string;

        keyName: string;

        name: string;

        condition: boolean;

        createdAt: Date;

        updatedAt: Date;

        modules: ModuleInterface[];

        permissions: PermissionInterface[];

        Permission?: PermissionInterface;
}
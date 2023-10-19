import { Injectable, Inject } from "@nestjs/common";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { Measure, Product, ProductPrice, ProductType } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { Op } from "sequelize";
import { RoleDto } from "src/api/v1/datasource/remas/shared/domain/dto/role.dto";
import { Role } from "src/api/v1/datasource/remas/shared/domain/model/aaa/role";
import { Permission, RolePermission, User } from "src/api/v1/datasource";
import { CreateRoleDto } from "../../domain/dto/create-role.dto";


@Injectable()
export class RoleService {
    constructor(
        @Inject('ROLE_REPOSITORY')
        private roleService: typeof Role,
        @Inject('ROLE_PERMISSION_REPOSITORY')
        private rolePermissionService: typeof RolePermission,
    ) { }

    create(data: CreateRoleDto) {
        data = JSON.parse(JSON.stringify(data));
        delete data.uuid;
        return this.roleService.create(data as any, {
            include: [
                { model: RolePermission }
            ]
        });
    }

    findAll(data?: Partial<RoleDto>) {
        console.log("🚀 ~ file: role.service.ts:31 ~ RoleService ~ findAll ~ data:", data)
        data = JSON.parse(JSON.stringify(data));
        const users = StructureHelper.searchProperty(data, 'users', true)[0];
        const permissions = StructureHelper.searchProperty(data, 'permissions', true)[0];
        const rolePermissions = StructureHelper.searchProperty(data, 'rolePermissions', true)[0];
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];

        const include = [];
        if (users && users[0]) include.push({
            where: users,
            model: User,
        });

        if (permissions && permissions[0]) include.push({
            where: permissions,
            model: Permission,
        });

        if (rolePermissions && rolePermissions[0]) include.push({
            where: rolePermissions,
            model: RolePermission,
        });

        return this.roleService.findAll({
            where: data,
            include: include,
            ...pagination,
        })
    }

    findOne(uuid: string) {
        if (uuid == 'new') return undefined;
        return this.roleService.findOne({
            where: { uuid },
            include: [{ model: RolePermission }]
        });
    }

    async update(uuid: string, data: CreateRoleDto) {
        data = JSON.parse(JSON.stringify(data));
        const rolePermissions = StructureHelper.searchProperty(data, 'rolePermissions', true)[0];
        if (rolePermissions && rolePermissions[0]) {
            for (let index = 0; index < rolePermissions.length; index++) {
                const rolePermission = rolePermissions[index];
                if (rolePermission.uuid) {
                    await this.rolePermissionService.update(rolePermission, { where: { uuid: rolePermission.uuid } })
                } else {
                    await this.rolePermissionService.create(rolePermission);
                }
            }
        }
        return this.roleService.update(data as any, {
            where: { uuid }
        });
    }
}
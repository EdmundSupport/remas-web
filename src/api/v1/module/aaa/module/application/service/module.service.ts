import { Injectable, Inject } from "@nestjs/common";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { Measure, Product, ProductPrice, ProductType } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { Op } from "sequelize";
import { ModuleDto } from "src/api/v1/datasource/remas/shared/domain/dto/module.dto";
import { Module } from "src/api/v1/datasource/remas/shared/domain/model/aaa/module";
import { Permission, Privilege, User } from "src/api/v1/datasource";


@Injectable()
export class ModuleService {
    constructor(
        @Inject('MODULE_REPOSITORY')
        private moduleService: typeof Module,
    ) { }

    findAll(data?: Partial<ModuleDto>) {
        data = JSON.parse(JSON.stringify(data));
        const privileges = StructureHelper.searchProperty(data, 'privileges', true)[0];
        const permissions = StructureHelper.searchProperty(data, 'permissions', true)[0];
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];

        const include = [];

        if(permissions && permissions[0]) include.push({
            where: permissions,
            model: Permission,
        });

        if(privileges && privileges[0]) include.push({
            where: privileges,
            model: Privilege,
        });

        return this.moduleService.findAll({
            where: data,
            include: include,
            ...pagination,
        })
    }

    findOne(uuid: string) {
        return this.moduleService.findOne({ where: { uuid } });
    }
}
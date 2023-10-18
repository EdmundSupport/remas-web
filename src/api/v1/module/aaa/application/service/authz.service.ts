import { Inject, Injectable } from "@nestjs/common";
import { Module, Permission, Privilege, Role } from "src/api/v1/datasource";
import { RemasHelper } from "src/api/v1/datasource/remas/shared/application/helper/remas.helper";

@Injectable()
export class AuthzService {
    constructor(
        @Inject('ROLE_REPOSITORY')
        private roleService: typeof Role,
        @Inject('MODULE_REPOSITORY')
        private moduleService: typeof Module,
        @Inject('PRIVILEGE_REPOSITORY')
        private privilegeService: typeof Privilege,
        @Inject('PERMISSION_REPOSITORY')
        private permissionService: typeof Permission,
        private remasHelper: RemasHelper,
    ) { }

    async findAll() {
        return this.roleService.findAll({
            include: [
                {model: Permission}
            ]
        });
    }
    
    async findOne(uuid: string) {
        return this.roleService.findAll({
            include: [
                {model: Permission}
            ]
        })
    }

    seriealize() {

    }
}
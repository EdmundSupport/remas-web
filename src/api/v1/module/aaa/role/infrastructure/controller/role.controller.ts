import { Body, Controller, Delete, Get, Headers, Param, ParseArrayPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoleService } from "../../application/service/role.service";
import { RoleDto } from "src/api/v1/datasource/remas/shared/domain/dto/role.dto";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";
import { CreateRoleDto } from "../../domain/dto/create-role.dto";

@ApiTags('Role')
@Controller({
    path: 'role'
})
export class RoleController {
    constructor(
        private roleService: RoleService,
    ) { }

    @Post()
    create(@Body() data: CreateRoleDto) {
        return this.roleService.create(data);
    }

    @Get()
    findAll(@Query() data: RoleDto) {
        return this.roleService.findAll(data);
    }

    @Get('/:uuid')
    findOne(@Param('uuid', NewOrUUIDValidationPipe) uuid: string) {
        return this.roleService.findOne(uuid);
    }

    @Patch('/:uuid')
    update(@Param('uuid', NewOrUUIDValidationPipe) uuid: string, @Body() data: CreateRoleDto) {
        return this.roleService.update(uuid, data);
    }
}
import { Body, Controller, Delete, Get, Headers, Param, ParseArrayPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ModuleService } from "../../application/service/module.service";
import { ModuleDto } from "src/api/v1/datasource/remas/shared/domain/dto/aaa/module.dto";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";

@ApiTags('Module')
@Controller({
    path: 'module'
})
export class ModuleController {
    constructor(
        private moduleService: ModuleService,
    ) { }

    @Get()
    findAll(@Query() data: ModuleDto) {
        return this.moduleService.findAll(data);
    }

    @Get('/:uuid')
    findOne(@Param('uuid', NewOrUUIDValidationPipe) uuid: string) {
        return this.moduleService.findOne(uuid);
    }
}
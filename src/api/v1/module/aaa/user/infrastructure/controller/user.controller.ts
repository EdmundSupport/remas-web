import { Body, Controller, Delete, Get, Headers, Param, ParseArrayPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../../application/service/user.service";
import { UserDto } from "src/api/v1/datasource/remas/shared/domain/dto/user.dto";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";
import { CreateUserDto } from "../../domain/dto/create-user.dto";

@ApiTags('User')
@Controller({
    path: 'user'
})
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Post()
    create(@Body() data: CreateUserDto) {
        return this.userService.create(data);
    }

    @Get()
    findAll(@Query() data: UserDto) {
        return this.userService.findAll(data);
    }

    @Get('/:uuid')
    findOne(@Param('uuid', NewOrUUIDValidationPipe) uuid: string) {
        return this.userService.findOne(uuid);
    }

    @Patch('/:uuid')
    update(@Param('uuid') uuid: string, @Body() data: UserDto) {
        return this.userService.update(uuid, data);
    }
}
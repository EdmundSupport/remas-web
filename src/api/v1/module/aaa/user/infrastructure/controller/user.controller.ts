import { Body, Controller, Delete, Get, Headers, ParseArrayPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../../application/service/user.service";
import { UserDto } from "src/api/v1/datasource/remas/shared/domain/dto/user.dto";

@ApiTags('User')
@Controller({
    path: 'user'
})
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Get()
    findAll(@Query() data: UserDto) {
        return this.userService.findAll(data);
    }
}
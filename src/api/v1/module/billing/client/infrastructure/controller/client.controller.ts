import { Body, Controller, Delete, Get, Headers, ParseArrayPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ClientService } from "../../application";
import { ApiTags } from "@nestjs/swagger";
import { CreateDto, FindDto } from "../../domain";

@ApiTags('Clientes')
@Controller({
    path: 'client'
})
export class ClientController {
    constructor(
        private clientService: ClientService,
    ) { }

    @Post()
    create(@Body() data: CreateDto) {
        return this.clientService.create(data);
    }

    @Get()
    findAll(@Query() data: FindDto) {
        return this.clientService.findAll(data);
    }
}
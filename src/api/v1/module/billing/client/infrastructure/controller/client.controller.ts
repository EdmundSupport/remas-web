import { Body, Controller, Delete, Get, Headers, ParseArrayPipe, Post, UseGuards } from "@nestjs/common";
import { ClientService } from "../../application";
import { ApiTags } from "@nestjs/swagger";
import { CreateDto } from "../../domain";

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
}
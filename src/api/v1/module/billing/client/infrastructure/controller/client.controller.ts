import { Body, Controller, Delete, Get, Headers, ParseArrayPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ClientService } from "../../application";
import { ApiTags } from "@nestjs/swagger";
import { ClientDto } from "src/api/v1/datasource/remas/shared/domain/dto/client.dto";

@ApiTags('Clientes')
@Controller({
    path: 'client'
})
export class ClientController {
    constructor(
        private clientService: ClientService,
    ) { }

    // @Post()
    // create(@Body() data: any) {
    //     return this.clientService.create(data);
    // }

    @Get()
    findAll(@Query() data: ClientDto) {
        return this.clientService.findAll(data);
    }
}
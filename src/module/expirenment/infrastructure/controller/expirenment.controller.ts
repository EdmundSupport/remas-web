import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ExpirenmentService } from "../../application/service/expirenment.service";
import { CreateDto, FindDto, UpdateDto } from "../../domain/dto/expirenment.dto";
import { AuthGuard } from "shared/auth/infrastructure/guard/auth.guard";
import { FilterResponseHelper } from "shared/filter_response/application/helper/filter_response.helper";

@ApiTags('Modulo de Expirementación')
@Controller({
    path: 'expirenment',
    //version: '2' // modify when version change
})
export class ExpirenmentController {
    constructor(
        private expirenmentService: ExpirenmentService,
    ) { }

    @Post('')
    async create(@Body() data: CreateDto) {
        return this.expirenmentService.create(data);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Get('')
    async find(@Query() data: FindDto) {
        return this.expirenmentService.find({ where: { ...data } });
    }

    @Get(':uuid')
    async findOne(@Param('uuid', ParseIntPipe) uuid: string) {
        return this.expirenmentService.findOne(uuid);
    }

    @Patch(':uuid')
    async update(@Body() data: UpdateDto, @Param('uuid', ParseIntPipe) uuid: string) {
        return this.expirenmentService.update(data, uuid);
    }

    @Delete('/:uuid')
    async delete(@Param('uuid', ParseIntPipe) uuid: string) {
        return this.expirenmentService.delete(uuid);
    }
}
import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, Res, StreamableFile } from "@nestjs/common";
import { ChargeService } from "../../application/service/charge.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateChargeDto } from "../../domain/dto/create-charge.dto";
import { ChargeDto } from "src/api/v1/datasource/remas/shared/domain/dto/charge.dto";
import { Uuid } from "shared/validation/infrastructure/decoration/uuid.decoration";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";
import { ExportService } from "shared/export/application/service/export.service";
import { Response, Request } from "express";
import { FindChargeDto } from "../../domain/dto/find-charge.dto";

@ApiTags('Cotizaciones')
@Controller({
    path: 'charge'
})
export class ChargeController {
    constructor(
        private chargeService: ChargeService,
        private exportService: ExportService,
    ) { }

    @Post()
    create(@Body() data: CreateChargeDto) {
        return this.chargeService.create(data);
    }

    @Get()
    findAll(@Query() data: FindChargeDto) {
        return this.chargeService.findAll(data);
    }

    // @Get('/export/:uuid/:type')
    // async export(@Param('uuid', NewOrUUIDValidationPipe) uuid: string, @Param('type') type: string, @Res() response: Response, @Req() request: Request) {
    //     try{
    //         const buffer = await this.exportService.exportPdf('./shared/export/application/service/template.html', { htmlData: { title: 'Título', content: 'Contenido' } });
    //         response.setHeader('Content-Type', 'application/pdf');
    //         response.setHeader('Content-Disposition', 'inline; filename=example.pdf');
    //         response.end(buffer, 'binary');
    //     }catch(error){
    //         request.next(error);
    //     }

    // }

    @Get('/:uuid')
    findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.chargeService.findOne(uuid);
    }

    @Patch('/:uuid')
    update(@Param('uuid', NewOrUUIDValidationPipe) uuid: string, @Body() data: CreateChargeDto) {
        return this.chargeService.update(uuid, data);
    }
}
import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, Res, StreamableFile } from "@nestjs/common";
import { DischargeService } from "../../application/service/discharge.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateDischargeDto } from "../../domain/dto/create-discharge.dto";
import { DischargeDto } from "src/api/v1/datasource/remas/shared/domain/dto/discharge.dto";
import { Uuid } from "shared/validation/infrastructure/decoration/uuid.decoration";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";
import { ExportService } from "shared/export/application/service/export.service";
import { Response, Request } from "express";
import { FindDischargeDto } from "../../domain/dto/find-discharge.dto";

@ApiTags('Cotizaciones')
@Controller({
    path: 'discharge'
})
export class DischargeController {
    constructor(
        private dischargeService: DischargeService,
        private exportService: ExportService,
    ) { }

    @Post()
    create(@Body() data: CreateDischargeDto) {
        return this.dischargeService.create(data);
    }

    @Get()
    findAll(@Query() data: FindDischargeDto) {
        return this.dischargeService.findAll(data);
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
        return this.dischargeService.findOne(uuid);
    }

    @Patch('/:uuid')
    update(@Param('uuid', NewOrUUIDValidationPipe) uuid: string, @Body() data: CreateDischargeDto) {
        console.log("🚀 ~ file: discharge.controller.ts:52 ~ DischargeController ~ update ~ data:", JSON.stringify(data))
        return this.dischargeService.update(uuid, data);
    }
}
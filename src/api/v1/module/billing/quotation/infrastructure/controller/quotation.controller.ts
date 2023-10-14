import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, Res, StreamableFile } from "@nestjs/common";
import { QuotationService } from "../../application/service";
import { ApiTags } from "@nestjs/swagger";
import { CreateQuotationDto } from "../../domain/dto/create-quotation.dto";
import { QuotationDto } from "src/api/v1/datasource/remas/shared/domain/dto/quotation.dto";
import { FindQuotationDto } from "../../domain/dto/find-quotation.dto";
import { Uuid } from "shared/validation/infrastructure/decoration/uuid.decoration";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";
import { ExportService } from "shared/export/application/service/export.service";
import { Response, Request } from "express";

@ApiTags('Cotizaciones')
@Controller({
    path: 'quotation'
})
export class QuotationController {
    constructor(
        private quotationService: QuotationService,
        private exportService: ExportService,
    ) { }

    @Post()
    create(@Body() data: CreateQuotationDto) {
        return this.quotationService.create(data);
    }

    @Get()
    findAll(@Query() data: FindQuotationDto) {
        return this.quotationService.findAll(data);
    }

    @Get('/export/:uuid/:type')
    async export(@Param('uuid', NewOrUUIDValidationPipe) uuid: string, @Param('type') type: string, @Res() response: Response, @Req() request: Request) {
        try{
            const buffer = await this.exportService.exportPdf('./shared/export/application/service/template.html', { htmlData: { title: 'Título', content: 'Contenido' } });
            response.setHeader('Content-Type', 'application/pdf');
            response.setHeader('Content-Disposition', 'inline; filename=example.pdf');
            response.end(buffer, 'binary');
        }catch(error){
            request.next(error);
        }

    }

    @Get('/:uuid')
    findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.quotationService.findOne(uuid);
    }

    @Patch('/:uuid')
    update(@Param('uuid', NewOrUUIDValidationPipe) uuid: string, @Body() data: CreateQuotationDto) {
        return this.quotationService.update(uuid, data);
    }
}
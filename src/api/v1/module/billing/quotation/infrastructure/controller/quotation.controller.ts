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
import { readFileSync, statSync } from "fs";
import * as path from 'path';
import * as  handlebars from 'handlebars';
import { FileHelper } from "shared/file/application/helper/file.helper";
import { HttpService } from "@nestjs/axios";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { QuotationDetailDto } from "src/api/v1/datasource/remas/shared/domain/dto/quotation-detail.dto";
import { FilterResponseHelper } from "shared/filter_response";
@ApiTags('Cotizaciones')
@Controller({
    path: 'quotation'
})
export class QuotationController {
    constructor(
        private quotationService: QuotationService,
        private exportService: ExportService,
        private httpService: HttpService,
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
        try {
            const quotation = JSON.parse(JSON.stringify(await this.quotationService.findOne(uuid)));
            quotation.quotationDetails = quotation.quotationDetails.map((quotationDetail) => {
                quotationDetail['import'] = Number(quotationDetail.amount) * Number(quotationDetail.price);
                return quotationDetail;
            })

            const logoPath = `${__dirname}/template/logo.jpg`.replace('src\\', '').replace('controller/', '');
            const file = new FileHelper(logoPath, { httpService: this.httpService });
            await file.toBase64();

            const templatePath = `${__dirname}/template/quotation.template.html`.replace('src\\', '').replace('controller/', '');
            const buffer = await this.exportService.exportPdf(templatePath,
                {
                    htmlData: {
                        quotation,
                        quotationDetails: '',
                        logo: file.fileBase64,
                        content: 'Contenido'
                    }
                });
            response.setHeader('Content-Type', 'application/pdf');
            response.setHeader('Content-Disposition', 'inline; filename=example.pdf');
            response.end(buffer, 'binary');
            return true;
        } catch (error) {
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
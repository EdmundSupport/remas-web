import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, Res, StreamableFile } from "@nestjs/common";
import { MaintenanceService } from "../../application/service/maintenance.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateMaintenanceDto } from "../../domain/dto/create-maintenance.dto";
import { MaintenanceDto } from "src/api/v1/datasource/remas/shared/domain/dto/billing/maintenance.dto";
import { Uuid } from "shared/validation/infrastructure/decoration/uuid.decoration";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";
import { ExportService } from "shared/export/application/service/export.service";
import { Response, Request } from "express";
import { FindMaintenanceDto } from "../../domain/dto/find-maintenance.dto";

@ApiTags('Cotizaciones')
@Controller({
    path: 'maintenance'
})
export class MaintenanceController {
    constructor(
        private maintenanceService: MaintenanceService,
        private exportService: ExportService,
    ) { }

    @Post()
    create(@Body() data: CreateMaintenanceDto) {
        return this.maintenanceService.create(data);
    }

    @Get()
    findAll(@Query() data: FindMaintenanceDto) {
        return this.maintenanceService.findAll(data);
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
        return this.maintenanceService.findOne(uuid);
    }

    @Patch('/:uuid')
    update(@Param('uuid', NewOrUUIDValidationPipe) uuid: string, @Body() data: CreateMaintenanceDto) {
        return this.maintenanceService.update(uuid, data);
    }
}
import { Controller, Param, Patch, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";
import { Request } from "express";
import { MaintenanceTrackingService } from "../../application/service/maintenance-tracking.service";

@ApiTags('Cotizaciones: Generacion de orden de mantenimiento.')
@Controller({
    path: 'maintenance/tracking',
})
export class MaintenanceTrackingController {
    constructor(
        private maintenanceTrackingService: MaintenanceTrackingService,
    ) { }

    @Patch('confirm/:uuid')
    update(@Param('uuid', NewOrUUIDValidationPipe) uuid: string, @Req() request: Request) {
        const confirmUuid = request.headers['confirmuuid'] as string;
        return this.maintenanceTrackingService.confirm(uuid, confirmUuid);
    }
}
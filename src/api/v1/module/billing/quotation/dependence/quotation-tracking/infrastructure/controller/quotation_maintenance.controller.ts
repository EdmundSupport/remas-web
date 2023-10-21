import { Controller, Param, Patch, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";
import { QuotationTrackingService } from "../../application/quotation-tracking.service";
import { Request } from "express";

@ApiTags('Cotizaciones: Generacion de orden de mantenimiento.')
@Controller({
    path: 'quotation/tracking',
})
export class QuotationTrackingController {
    constructor(
        private quotationTrackingService: QuotationTrackingService,
    ) { }

    @Patch('confirm/:uuid')
    update(@Param('uuid', NewOrUUIDValidationPipe) uuid: string, @Req() request: Request) {
        const confirmUuid = request.headers['confirmuuid'] as string;
        return this.quotationTrackingService.confirm(uuid, confirmUuid);
    }
}
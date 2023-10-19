import { Injectable, Inject } from "@nestjs/common";
import { QuotationService } from "../../../application/service";
import { QuotationMaintenanceService } from "../../quotation-maintenance/application/service/quotation-maintenance.service";
import { Quotation, QuotationStatus } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { FilterResponseHelper } from "shared/filter_response";

@Injectable()
export class QuotationTrackingService {
    constructor(
        @Inject('QUOTATION_REPOSITORY')
        private quotationRepository: typeof Quotation,
        @Inject('QUOTATION_STATUS_REPOSITORY')
        private quotaitonStatusService: typeof QuotationStatus,
        private quotationService: QuotationService,
        private quotationMaintenanceService: QuotationMaintenanceService,
    ) { }

    async confirm(quotationUuid: string) {
        const quotationStatus = await this.quotaitonStatusService.findOne({ where: { keyName: 'confirmed' } });
        if(!quotationStatus) {
            FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado de confirmado.')
        }
        const quotation = await this.quotationService.findOne(quotationUuid);
        await this.quotationMaintenanceService.generate(quotationUuid, new Promise((resolve) => resolve(quotation)));
        await this.quotationRepository.update({ quotationStatusUuid: quotationStatus.uuid }, { where: { uuid: quotationUuid } });
        return true;
    }
}
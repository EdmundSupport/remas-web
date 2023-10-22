import { Injectable, Inject } from "@nestjs/common";
import { FilterResponseHelper } from "shared/filter_response";
import { ChargeService } from "src/api/v1/module/inventory/charge/application/service/charge.service";
import { QuotationService } from "./../../../../application/service";
import { QuotationCharge } from "src/api/v1/datasource/remas/shared/domain/model/billing/quotation-charge";


@Injectable()
export class QuotationChargeService {
    constructor(
        @Inject('QuotationChargeRepository')
        private quotationChargeService: typeof QuotationCharge,
        private quotationService: QuotationService,
        private chargeService: ChargeService,
    ) { }

    async generate(quotationUuid: string, quotationPromise = this.quotationService.findOne(quotationUuid)) {
        const quotation = await quotationPromise;
        if (!quotation) FilterResponseHelper.httpException('NOT_FOUND', 'No existe la cotización.');

        const durationStartMs = 1000 * 60 * 60 * 24;
        const quotationDateMs = quotation.date.getTime();
        const dateStartScheduledMs = quotationDateMs + durationStartMs;
        const dateStartScheduled = new Date(dateStartScheduledMs);

        const durationEndMs = 1000 * 60 * 60;
        const dateEndScheduledMs = quotationDateMs + durationStartMs + durationEndMs;
        const dateEndScheduled = new Date(dateEndScheduledMs);
        const cargeNumber = Number(new Date().toISOString().replace(/T/g, '').replace(/Z/g, '').replace(/-/g, '').replace(/:/g, ''))

        const charge = {
            number: cargeNumber,
            dateStartScheduled,
            dateEndScheduled,
            chargeDetailScheduleds: []
        }
        console.log("🚀 ~ file: quotation-charge.service.ts:37 ~ QuotationChargeService ~ generate ~ charge:", charge)

        const chargeDetailScheduleds = quotation.quotationDetails.map((quotationDetail) => {
            return {
                amount: quotationDetail.amount,
                productUuid: quotationDetail.productUuid,
                measureUnitUuid: quotationDetail.measureUnitUuid,
            }
        });
        charge.chargeDetailScheduleds = chargeDetailScheduleds;

        await this.chargeService.create(charge);
    }
}
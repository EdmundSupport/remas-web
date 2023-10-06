import { Injectable, Inject } from "@nestjs/common";
import { Quotation, QuotationDetail } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { CreateInterface } from "../../domain";

@Injectable()
export class QuotationService {
    constructor(
        @Inject('QUOTATION_REPOSITORY')
        private quotationService: typeof Quotation,
    ) { }

    create(data: CreateInterface) {
        return this.quotationService.create({
            number: data.number,
            date: data.date,
            clientUuid: data.clientUuid,
            quotationDetails: data.quotationDetails
        }, {
            include: [{ model: QuotationDetail }]
        })
    }
}
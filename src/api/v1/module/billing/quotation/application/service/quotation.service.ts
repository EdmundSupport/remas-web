import { Injectable, Inject } from "@nestjs/common";
import { Client, Quotation, QuotationDetail } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { CreateInterface, FindInterface } from "../../domain";


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

    findAll(data: FindInterface) {
        const pagination = { limit: data.limit, offset: data.offset };
        delete data.limit;
        delete data.offset;
        return this.quotationService.findAll({
            // where: {data},
            include: [{ model: Client }],
            ...pagination,
        })
    }
}
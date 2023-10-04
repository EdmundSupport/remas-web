import { Client, Quotation, QuotationDetail, QuotationStatus } from "../../../shared/domain/model/billing"
import { Branch, Company, Tribute } from "../../../shared/domain/model/identity"

export const billingConnectionProvider = [
    { provide: 'CLIENT_REPOSITORY', useValue: Client },
    { provide: 'QUOTATION_STATUS_REPOSITORY', useValue: QuotationStatus },
    { provide: 'QUOTATION_REPOSITORY', useValue: Quotation },
    { provide: 'QUOTATION_DETAIL_REPOSITORY', useValue: QuotationDetail },
]

export const billingModels = [
    Client,
    QuotationStatus,
    Quotation,
    QuotationDetail,
    Tribute,
    Company,
    Branch,
]
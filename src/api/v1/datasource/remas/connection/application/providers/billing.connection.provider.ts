import { Client, Maintenance, MaintenanceStatus, MaintenanceStep, MaintenanceStepDetail, Quotation, QuotationDetail, QuotationStatus } from "../../../shared/domain/model/billing"
import { QuotationCharge } from "../../../shared/domain/model/billing/quotation-charge"
import { QuotationMaintenance } from "../../../shared/domain/model/billing/quotation-maintenance"
import { Branch, Company, Tribute } from "../../../shared/domain/model/identity"

export const billingConnectionProvider = [
    { provide: 'CLIENT_REPOSITORY', useValue: Client },
    { provide: 'QUOTATION_STATUS_REPOSITORY', useValue: QuotationStatus },
    { provide: 'QUOTATION_REPOSITORY', useValue: Quotation },
    { provide: 'QUOTATION_DETAIL_REPOSITORY', useValue: QuotationDetail },
    { provide: 'QUOTATION_MAINTENANCE_REPOSITORY', useValue: QuotationMaintenance },
    { provide: 'QUOTATION_CHARGE_REPOSITORY', useValue: QuotationCharge },

    

    { provide: 'MAINTENANCE_STATUS_REPOSITORY', useValue: MaintenanceStatus },
    { provide: 'MAINTENANCE_REPOSITORY', useValue: Maintenance },
    { provide: 'MAINTENANCE_STEP_REPOSITORY', useValue: MaintenanceStep },
    { provide: 'MAINTENANCE_STEP_DETAIL_REPOSITORY', useValue: MaintenanceStepDetail },
]

export const billingModels = [
    Client,
    QuotationStatus,
    Quotation,
    QuotationDetail,
    Tribute,
    Company,
    Branch,
    Maintenance,
    MaintenanceStep,
    MaintenanceStepDetail,
]
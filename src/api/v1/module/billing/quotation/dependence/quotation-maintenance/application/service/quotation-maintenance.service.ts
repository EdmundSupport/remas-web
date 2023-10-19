import { Injectable, Inject } from "@nestjs/common";
import { FilterResponseHelper } from "shared/filter_response";
import { MaintenanceService } from "src/api/v1/module/billing/maintenance/application/service/maintenance.service";
import { QuotationService } from "./../../../../application/service";
import { ProductService } from "src/api/v1/module/inventory/product/application/service/product.service";
import { QuotationMaintenance } from "src/api/v1/datasource/remas/shared/domain/model/billing/quotation-maintenance";


@Injectable()
export class QuotationMaintenanceService {
    constructor(
        @Inject('QUOTATION_MAINTENANCE_REPOSITORY')
        private quotationMaintenanceService: typeof QuotationMaintenance,
        private quotationService: QuotationService,
        private maintenanceService: MaintenanceService,
        private productService: ProductService,
    ) { }

    async generate(quotationUuid: string, quotationPromise = this.quotationService.findOne(quotationUuid)) {
        const quotation = await quotationPromise;
        if (!quotation) FilterResponseHelper.httpException('NOT_FOUND', 'No existe la cotización.');

        const productUuids = quotation.quotationDetails.map((quotationDetail) => quotationDetail.productUuid);
        const products = await this.productService.findAll({
            uuid: productUuids,
            productMaintenanceSteps: [{ condition: true, productMaintenanceStepDetails: [{ condition: true }] }]
        });

        products.map(async (product) => {
            try {
                const durationMs = product.productMaintenanceSteps.reduce((ms, step) => {
                    ms += Number(step.durationMs);
                    return ms;
                }, 0);

                const quotationDateMs = quotation.date.getTime();
                const dateStartScheduledMs = quotationDateMs + durationMs;
                const dateStartScheduled = new Date(dateStartScheduledMs);
                const maintenanceNumber = Number(new Date().toISOString().replace(/T/g, '').replace(/Z/g, '').replace(/-/g, '').replace(/:/g, ''))

                const createMaintenance = {
                    number: maintenanceNumber,
                    dateStartScheduled: dateStartScheduled,
                    dateEndScheduled: quotation.date,
                    productUuid: product.uuid,
                    maintenanceSteps: [],
                }
                const maintenance = await this.maintenanceService.create(createMaintenance);

                await this.quotationMaintenanceService.create({
                    quotationUuid,
                    maintenanceUuid: maintenance.uuid
                });
            } catch (error) {
                console.log("🚀 ~ file: quotation_tracking.service.ts:52 ~ QuotationMantenanceService ~ this.maintenanceService.create ~ error:", error)
                // TODO enviar una notificacion de que no se creo un mantenimiento.
                return undefined;
            }
        })
    }
}
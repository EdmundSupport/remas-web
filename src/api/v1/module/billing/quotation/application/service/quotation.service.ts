import { Injectable, Inject } from "@nestjs/common";
import { Client, Quotation, QuotationDetail, QuotationStatus } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { QuotationDto } from "src/api/v1/datasource/remas/shared/domain/dto/quotation.dto";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { CreateQuotationDto } from "../../domain/dto/create-quotation.dto";
import { FilterResponseHelper } from "shared/filter_response";
import { Op } from "sequelize";
import { FindQuotationDto } from "../../domain/dto/find-quotation.dto";
import { ValidationHelper } from "shared/validation/application/helper/validation.helper";


@Injectable()
export class QuotationService {
    constructor(
        @Inject('QUOTATION_REPOSITORY')
        private quotationService: typeof Quotation,
        @Inject('QUOTATION_DETAIL_REPOSITORY')
        private quotationDetailService: typeof QuotationDetail,
        @Inject('QUOTATION_STATUS_REPOSITORY')
        private quotationStatusService: typeof QuotationStatus,
    ) { }

    async create(data: CreateQuotationDto) {
        data = JSON.parse(JSON.stringify(data));
        const client = StructureHelper.searchProperty(data, 'client', true)[0];
        const quotationStatus = StructureHelper.searchProperty(data, 'quotationStatus', true)[0];
        const quotationDetails = StructureHelper.searchProperty(data, 'quotationDetails')[0];

        const include = [];
        if (quotationDetails && quotationDetails[0]) include.push({
            model: QuotationDetail,
            require: true,
        });

        if (!(data?.quotationStatusUuid && data?.quotationStatusUuid != '')) {
            const quotationStatus = await this.quotationStatusService.findOne({ where: { keyName: 'created' } });
            if (!quotationStatus)
                throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado de la cotización.');

            Object.assign(data, { quotationStatusUuid: quotationStatus.uuid });
        }

        if (data?.uuid && data?.uuid != '' && ValidationHelper.isUUID(data?.uuid)) {
            const quotation = await this.quotationService.findOne({ where: { uuid: data?.uuid } });
            if (quotation?.number == data?.number)
                throw FilterResponseHelper.httpException('BAD_REQUEST', 'El número de la cotización ya exite.');

        }


        if (!ValidationHelper.isUUID(data?.uuid)) delete data.uuid;
        return this.quotationService.create(data as any, {
            include: include
        })
    }

    findAll(data: FindQuotationDto) {
        data = JSON.parse(JSON.stringify(data));
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        const client = StructureHelper.searchProperty(data, 'client', true)[0];
        const quotationStatus = StructureHelper.searchProperty(data, 'quotationStatus', true)[0];
        const quotationDetails = StructureHelper.searchProperty(data, 'quotationDetails', true)[0];
        const date = StructureHelper.searchProperty(data, 'date', true)[0];
        if (date && Array.isArray(date)) {
            const startDate = date[0];
            const endDate = date[date.length - 1];
            Object.assign(data, { date: { [Op.between]: [startDate, endDate] } });
        } else if (date) {
            Object.assign(data, { date });
        }

        const include = [];
        if (client) include.push({
            model: Client,
            where: client
        });
        if (quotationStatus) include.push({
            model: QuotationStatus,
            where: quotationStatus
        });
        if (quotationDetails && quotationDetails[0]) include.push({
            model: QuotationDetail,
            where: quotationDetails,
        });
        return this.quotationService.findAll({
            where: data,
            include: include,
            ...pagination,
        })
    }

    findOne(uuid: string) {
        return this.quotationService.findOne({
            where: { uuid },
            include: [{ model: QuotationDetail }],
        })
    }

    async update(uuid: string, data: CreateQuotationDto) {
        data = JSON.parse(JSON.stringify(data));
        const client = StructureHelper.searchProperty(data, 'client', true)[0];
        const quotationStatus = StructureHelper.searchProperty(data, 'quotationStatus', true)[0];
        const quotationDetails = StructureHelper.searchProperty(data, 'quotationDetails')[0] as QuotationDetail[] | undefined;

        if (!(data?.quotationStatusUuid && data?.quotationStatusUuid != '')) {
            const quotationStatus = await this.quotationStatusService.findOne({ where: { keyName: 'edited' } });
            if (!quotationStatus)
                throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado de la cotización.');
        }

        if (data?.uuid && data?.uuid != '') {
            const quotation = await this.quotationService.findOne({ where: { uuid: { [Op.not]: data?.uuid }, number: data.number } });
            if (quotation?.number == data?.number)
                throw FilterResponseHelper.httpException('BAD_REQUEST', 'El número de la cotización ya exite.');
        }

        const detailsSaveUuid = quotationDetails.map((quotationDetail) => quotationDetail.uuid);
        const detailsDelete = await this.quotationDetailService.findAll({
            where: { uuid: { [Op.notIn]: detailsSaveUuid }, quotationUuid: uuid }
        });

        const deleteDetailsUuid = detailsDelete.map((detailDelete) => detailDelete.uuid);
        await this.quotationDetailService.destroy({ where: { uuid: { [Op.in]: deleteDetailsUuid } } });
        await Promise.all(quotationDetails.filter((quotationDetail) => !deleteDetailsUuid.includes(quotationDetail.uuid)).map((quotationDetail) => {
            quotationDetail.quotationUuid = uuid;
            if (quotationDetail?.uuid) return this.quotationDetailService.update(quotationDetail, { where: { uuid: quotationDetail.uuid } })
            else return this.quotationDetailService.create(quotationDetail as any)
        }));

        try {

            await this.quotationService.update(data as any, { where: { uuid } });
        } catch (error) {
        }
        return true;
    }
}
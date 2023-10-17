import { Injectable, Inject } from "@nestjs/common";
import { Discharge, DischargeStatus, DischargeDetailScheduled, DischargeDetail } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { DischargeDto } from "src/api/v1/datasource/remas/shared/domain/dto/discharge.dto";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { CreateDischargeDto } from "../../domain/dto/create-discharge.dto";
import { FilterResponseHelper } from "shared/filter_response";
import { Op, WhereOptions } from "sequelize";
import { ValidationHelper } from "shared/validation/application/helper/validation.helper";
import { FindDischargeDto } from "../../domain/dto/find-discharge.dto";


@Injectable()
export class DischargeService {
    constructor(
        @Inject('DISCHARGE_REPOSITORY')
        private dischargeService: typeof Discharge,
        @Inject('DISCHARGE_DETAIL_SCHEDULED_REPOSITORY')
        private dischargeDetailScheduledService: typeof DischargeDetailScheduled,
        @Inject('DISCHARGE_STATUS_REPOSITORY')
        private dischargeStatusService: typeof DischargeStatus,
        @Inject('DISCHARGE_DETAIL_REPOSITORY')
        private dischargeDetailService: typeof DischargeDetail,
    ) { }

    async create(data: CreateDischargeDto) {
        data = JSON.parse(JSON.stringify(data));
        const dischargeDetailScheduleds = StructureHelper.searchProperty(data, 'dischargeDetailScheduleds')[0];

        const include = [];
        if (dischargeDetailScheduleds && dischargeDetailScheduleds[0]) {
            const dischargeDetailsInclude = [];
            const dischargeDetails = StructureHelper.searchProperty(dischargeDetailScheduleds, 'dischargeDetails')[0];

            data.dischargeDetailScheduleds = data.dischargeDetailScheduleds.map((dischargeDetailScheduled) => {
                dischargeDetailScheduled['msd'] = dischargeDetailScheduled.dischargeDetails;
                return dischargeDetailScheduled;
            });

            if (dischargeDetails && dischargeDetails[0]) {
                dischargeDetailsInclude.push({
                    model: DischargeDetail,
                    require: true,
                });
            }
            include.push({
                model: DischargeDetailScheduled,
                include: dischargeDetailsInclude,
                require: true,
            });
        }
        if (!(data?.dischargeStatusUuid && data?.dischargeStatusUuid != '')) {
            const dischargeStatus = await this.dischargeStatusService.findOne({ where: { keyName: 'created' } });
            if (!dischargeStatus)
                throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado del mantenimiento.');

            Object.assign(data, { dischargeStatusUuid: dischargeStatus.uuid });
        }
        data.userUuid = '9bc38dd5-3b8e-4b82-be86-3c8564c842d0';
        if (!ValidationHelper.isUUID(data?.uuid)) delete data.uuid;
        return this.dischargeService.create(data as any, {
            include: include
        });
    }

    findAll(data: FindDischargeDto) {
        data = JSON.parse(JSON.stringify(data));
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        const dateStartScheduled = StructureHelper.searchProperty(data, 'dateStartScheduled', true)[0];
        if (dateStartScheduled && Array.isArray(dateStartScheduled)) {
            const startDate = dateStartScheduled[0];
            const endDate = dateStartScheduled[dateStartScheduled.length - 1];
            Object.assign(data, { dateStartScheduled: { [Op.between]: [startDate, endDate] } });
        } else if (dateStartScheduled) {
            Object.assign(data, { dateStartScheduled });
        }
        const include = [];

        return this.dischargeService.findAll({
            where: data,
            include: include,
            ...pagination,
        })
    }

    async findOne(uuid: string) {
        const discharge = JSON.parse(JSON.stringify(await this.dischargeService.findOne({
            where: { uuid },
            include: [
                {
                    model: DischargeDetailScheduled,
                    include: [{ model: DischargeDetail }]
                }
            ],
        })));

        return discharge;
    }

    async update(uuid: string, data: CreateDischargeDto) {
        data = JSON.parse(JSON.stringify(data));
        const dischargeDetailScheduleds = StructureHelper.searchProperty(data, 'dischargeDetailScheduleds', true)[0];

        const dischargeStatus = await this.dischargeStatusService.findOne({ where: { keyName: 'edited' } });
        if (!dischargeStatus)
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado del mantenimiento.');

        Object.assign(data, { dischargeStatusUuid: dischargeStatus.uuid });

        for (let index = 0; index < dischargeDetailScheduleds.length; index++) {
            const dischargeDetailScheduled = dischargeDetailScheduleds[index];
            const include = [];

            if (dischargeDetailScheduled.dischargeDetails) include.push({
                model: DischargeDetail,
            });
            if (!dischargeDetailScheduled.uuid) {
                dischargeDetailScheduled['dischargeUuid'] = uuid;
                await this.dischargeDetailScheduledService.create(dischargeDetailScheduled, {
                    include: include
                });
            } else {
                const dischargeDetails = StructureHelper.searchProperty(dischargeDetailScheduled, 'dischargeDetails')[0];
                if (dischargeDetails) {
                    for (let indexDetail = 0; indexDetail < dischargeDetails.length; indexDetail++) {
                        const dischargeDetail = dischargeDetails[indexDetail];
                        if (dischargeDetail.uuid) {
                            this.dischargeDetailService.update(dischargeDetail, { where: { uuid: dischargeDetail.uuid } });
                        } else {
                            dischargeDetail['dischargeDetailScheduledUuid'] = dischargeDetailScheduled.uuid;
                            this.dischargeDetailService.create(dischargeDetail);
                        }
                    }
                }
                await this.dischargeDetailScheduledService.update(dischargeDetailScheduled, { where: { uuid: dischargeDetailScheduled.uuid } });
            }
        }

        await this.dischargeDetailScheduledService.update({ data } as any, { where: { uuid } });
        return true;
    }
}
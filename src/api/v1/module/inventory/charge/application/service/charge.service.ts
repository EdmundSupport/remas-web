import { Injectable, Inject } from "@nestjs/common";
import { Charge, ChargeStatus, ChargeDetailScheduled, ChargeDetail } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { ChargeDto } from "src/api/v1/datasource/remas/shared/domain/dto/charge.dto";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { CreateChargeDto } from "../../domain/dto/create-charge.dto";
import { FilterResponseHelper } from "shared/filter_response";
import { Op, WhereOptions } from "sequelize";
import { ValidationHelper } from "shared/validation/application/helper/validation.helper";
import { FindChargeDto } from "../../domain/dto/find-charge.dto";


@Injectable()
export class ChargeService {
    constructor(
        @Inject('CHARGE_REPOSITORY')
        private chargeService: typeof Charge,
        @Inject('CHARGE_DETAIL_SCHEDULED_REPOSITORY')
        private chargeDetailScheduledService: typeof ChargeDetailScheduled,
        @Inject('CHARGE_STATUS_REPOSITORY')
        private chargeStatusService: typeof ChargeStatus,
        @Inject('CHARGE_DETAIL_REPOSITORY')
        private chargeDetailService: typeof ChargeDetail,
    ) { }

    async create(data: CreateChargeDto) {
        data = JSON.parse(JSON.stringify(data));
        const chargeDetailScheduleds = StructureHelper.searchProperty(data, 'chargeDetailScheduleds')[0];

        const include = [];
        if (chargeDetailScheduleds && chargeDetailScheduleds[0]) {
            const chargeDetailsInclude = [];
            const chargeDetails = StructureHelper.searchProperty(chargeDetailScheduleds, 'chargeDetails')[0];

            data.chargeDetailScheduleds = data.chargeDetailScheduleds.map((chargeDetailScheduled) => {
                chargeDetailScheduled['msd'] = chargeDetailScheduled.chargeDetails;
                return chargeDetailScheduled;
            });

            if (chargeDetails && chargeDetails[0]) {
                chargeDetailsInclude.push({
                    model: ChargeDetail,
                    require: true,
                });
            }
            include.push({
                model: ChargeDetailScheduled,
                include: chargeDetailsInclude,
                require: true,
            });
        }
        if (!(data?.chargeStatusUuid && data?.chargeStatusUuid != '')) {
            const chargeStatus = await this.chargeStatusService.findOne({ where: { keyName: 'created' } });
            if (!chargeStatus)
                throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado del mantenimiento.');

            Object.assign(data, { chargeStatusUuid: chargeStatus.uuid });
        }
        data.userUuid = '9bc38dd5-3b8e-4b82-be86-3c8564c842d0';
        if (!ValidationHelper.isUUID(data?.uuid)) delete data.uuid;
        return this.chargeService.create(data as any, {
            include: include
        });
    }

    findAll(data: FindChargeDto) {
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

        return this.chargeService.findAll({
            where: data,
            include: include,
            ...pagination,
        })
    }

    async findOne(uuid: string) {
        const charge = JSON.parse(JSON.stringify(await this.chargeService.findOne({
            where: { uuid },
            include: [
                {
                    model: ChargeDetailScheduled,
                    include: [{ model: ChargeDetail }]
                }
            ],
        })));

        return charge;
    }

    async update(uuid: string, data: CreateChargeDto) {
        data = JSON.parse(JSON.stringify(data));
        const chargeDetailScheduleds = StructureHelper.searchProperty(data, 'chargeDetailScheduleds', true)[0];

        const chargeStatus = await this.chargeStatusService.findOne({ where: { keyName: 'edited' } });
        if (!chargeStatus)
            throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado del mantenimiento.');

        Object.assign(data, { chargeStatusUuid: chargeStatus.uuid });

        for (let index = 0; index < chargeDetailScheduleds.length; index++) {
            const chargeDetailScheduled = chargeDetailScheduleds[index];
            const include = [];

            if (chargeDetailScheduled.chargeDetails) include.push({
                model: ChargeDetail,
            });
            if (!chargeDetailScheduled.uuid) {
                chargeDetailScheduled['chargeUuid'] = uuid;
                await this.chargeDetailScheduledService.create(chargeDetailScheduled, {
                    include: include
                });
            } else {
                const chargeDetails = StructureHelper.searchProperty(chargeDetailScheduled, 'chargeDetails')[0];
                if (chargeDetails) {
                    for (let indexDetail = 0; indexDetail < chargeDetails.length; indexDetail++) {
                        const chargeDetail = chargeDetails[indexDetail];
                        if (chargeDetail.uuid) {
                            this.chargeDetailService.update(chargeDetail, { where: { uuid: chargeDetail.uuid } });
                        } else {
                            chargeDetail['chargeDetailScheduledUuid'] = chargeDetailScheduled.uuid;
                            this.chargeDetailService.create(chargeDetail);
                        }
                    }
                }
                await this.chargeDetailScheduledService.update(chargeDetailScheduled, { where: { uuid: chargeDetailScheduled.uuid } });
            }
        }

        await this.chargeDetailScheduledService.update({ data } as any, { where: { uuid } });
        return true;
    }
}
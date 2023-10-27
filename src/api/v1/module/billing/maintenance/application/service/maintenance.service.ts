import { Injectable, Inject } from "@nestjs/common";
import { Client, Maintenance, MaintenanceStatus, MaintenanceStep, MaintenanceStepDetail } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { MaintenanceDto } from "src/api/v1/datasource/remas/shared/domain/dto/billing/maintenance.dto";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { CreateMaintenanceDto } from "../../domain/dto/create-maintenance.dto";
import { FilterResponseHelper } from "shared/filter_response";
import { Op, WhereOptions, where } from "sequelize";
import { ValidationHelper } from "shared/validation/application/helper/validation.helper";
import { FindMaintenanceDto } from "../../domain/dto/find-maintenance.dto";
import { Product, ProductMaintenanceStep, ProductMaintenanceStepDetail } from "src/api/v1/datasource/remas/shared/domain/model/inventory";


@Injectable()
export class MaintenanceService {
    constructor(
        @Inject('MaintenanceRepository')
        private maintenanceService: typeof Maintenance,
        @Inject('MaintenanceStepRepository')
        private maintenanceStepService: typeof MaintenanceStep,
        @Inject('MaintenanceStatusRepository')
        private maintenanceStatusService: typeof MaintenanceStatus,
        @Inject('MaintenanceStepDetailRepository')
        private maintenanceStepDetailRepository: typeof MaintenanceStepDetail,
    ) { }

    async create(data: CreateMaintenanceDto) {
        data = JSON.parse(JSON.stringify(data));
        const maintenanceSteps = StructureHelper.searchProperty(data, 'maintenanceSteps')[0];

        const include = [];
        if (maintenanceSteps && maintenanceSteps[0]) {
            const maintenanceStepDetailsInclude = [];
            const maintenanceStepDetails = StructureHelper.searchProperty(maintenanceSteps, 'maintenanceStepDetails')[0];

            data.maintenanceSteps = data.maintenanceSteps.map((maintenanceStep) => {
                maintenanceStep['msd'] = maintenanceStep.maintenanceStepDetails;
                return maintenanceStep;
            });

            if (maintenanceStepDetails && maintenanceStepDetails[0]) {
                maintenanceStepDetailsInclude.push({
                    model: MaintenanceStepDetail,
                    require: true,
                });
            }
            include.push({
                model: MaintenanceStep,
                include: maintenanceStepDetailsInclude,
                require: true,
            });
        }
        if (!(data?.maintenanceStatusUuid && data?.maintenanceStatusUuid != '')) {
            const maintenanceStatus = await this.maintenanceStatusService.findOne({ where: { keyName: 'created' } });
            if (!maintenanceStatus)
                throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado del mantenimiento.');

            Object.assign(data, { maintenanceStatusUuid: maintenanceStatus.uuid });
        }
        data.userUuid = '9bc38dd5-3b8e-4b82-be86-3c8564c842d0';
        if (!ValidationHelper.isUUID(data?.uuid)) delete data.uuid;
        return this.maintenanceService.create(data as any, {
            include: include
        });
    }

    findAll(data: FindMaintenanceDto) {
        data = JSON.parse(JSON.stringify(data));
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        const dateStartScheduled = StructureHelper.searchProperty(data, 'dateStartScheduled', true)[0];
        if (dateStartScheduled) {
            if (Array.isArray(dateStartScheduled)) {
                Object.assign(data, { dateStartScheduled: { [Op.between]: dateStartScheduled } })
            } else Object.assign(data, { dateStartScheduled: dateStartScheduled })
        }
        const client = StructureHelper.searchProperty(data, 'client', true)[0];

        const include = [];
        if (client) include.push({
            model: Client,
            where: client
        });

        return this.maintenanceService.findAll({
            where: data,
            include: include,
            ...pagination,
        })
    }

    async findOne(uuid: string) {
        const maintenance = JSON.parse(JSON.stringify(await this.maintenanceService.findOne({
            where: { uuid },
            include: [
                {
                    model: MaintenanceStep,
                    include: [{ model: MaintenanceStepDetail }]
                }, { model: MaintenanceStatus }
            ],
        }))) as Maintenance;
        maintenance.maintenanceSteps = maintenance.maintenanceSteps.map((maintenanceStep) => {
            maintenanceStep.maintenanceStepDetails = maintenanceStep['msd'];
            delete maintenanceStep['msd'];
            return maintenanceStep;
        })
        return maintenance;
    }

    async update(uuid: string, data: CreateMaintenanceDto) {
        data = JSON.parse(JSON.stringify(data));
        const maintenanceSteps = StructureHelper.searchProperty(data, 'maintenanceSteps', true)[0] as MaintenanceStep[];
        // maintenanceSteps['maintenanceUuid'] = uuid;

        const maintenance = await this.findOne(uuid);
        if (!(maintenance?.maintenanceStatus?.keyName == 'confirmed')) {
            const maintenanceStatus = await this.maintenanceStatusService.findOne({ where: { keyName: 'edited' } });
            if (!maintenanceStatus)
                throw FilterResponseHelper.httpException('FAILED_DEPENDENCY', 'No se pudo determinar el estado del mantenimiento.');

            Object.assign(data, { maintenanceStatusUuid: maintenanceStatus.uuid });
        }

        for (let index = 0; index < maintenanceSteps?.length; index++) {
            const maintenanceStep = maintenanceSteps[index];
            const maintenanceStepDetails = StructureHelper.searchProperty(maintenanceStep, 'maintenanceStepDetails', true)[0];

            if (maintenanceStep.uuid) await this.maintenanceStepService.update(maintenanceStep, { where: { uuid: maintenanceStep.uuid } });
            else{
                maintenanceStep.maintenanceUuid = uuid;
                const stepCreated = await this.maintenanceStepService.create(maintenanceStep as any);
                maintenanceStep.uuid = stepCreated.uuid;
            }

            for (let indexDetail = 0; indexDetail < maintenanceStepDetails?.length; indexDetail++) {
                const detail = (maintenanceStepDetails![indexDetail] as MaintenanceStepDetail);
                if (detail.uuid) await this.maintenanceStepDetailRepository.update(detail, { where: { uuid: detail.uuid } });
                else {
                    detail.maintenanceStepUuid = maintenanceStep.uuid;
                    const detailCreated = await this.maintenanceStepDetailRepository.create(detail as any);
                    detail.uuid = detailCreated.uuid;
                }
            }
        }

        await this.maintenanceStepService.update({ data } as any, { where: { uuid } });
        return true;
    }
}
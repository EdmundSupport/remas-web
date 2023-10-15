import { Injectable, Inject } from "@nestjs/common";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { Measure } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { Op } from "sequelize";
import { MeasureDto } from "src/api/v1/datasource/remas/shared/domain/dto/measure.dto";


@Injectable()
export class MeasureService {
    constructor(
        @Inject('MEASURE_UNIT_REPOSITORY')
        private measureService: typeof Measure,
    ) { }

    findAll(data?: Partial<MeasureDto>) {
        data = JSON.parse(JSON.stringify(data));
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        if (data?.name) Object.assign(data, { name: { [Op.like]: `%${data.name}%` } });

        const include = [];

        return this.measureService.findAll({
            where: data,
            include: include,
            ...pagination,
        })
    }
}
import { Injectable, Inject } from "@nestjs/common";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { Measure, MeasureUnit, Product, ProductPrice, ProductType } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { Op } from "sequelize";
import { MeasureUnitDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/measure-unit.dto";


@Injectable()
export class MeasureUnitService {
    constructor(
        @Inject('MeasureUnitRepository')
        private measureUnitService: typeof MeasureUnit,
    ) { }

    findAll(data?: Partial<MeasureUnitDto>) {
        data = JSON.parse(JSON.stringify(data));
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        const measure = StructureHelper.searchProperty(data, 'measure', true)[0];
        if (measure?.name) Object.assign(measure, { name: { [Op.like]: `%${measure.name}%` } });
        const measuresUnit = StructureHelper.searchProperty(data, 'measuresUnit', true)[0];
        if (measuresUnit?.name) Object.assign(measuresUnit, { name: { [Op.like]: `%${measuresUnit.name}%` } });
        const measureUnit = StructureHelper.searchProperty(data, 'measureUnit', true)[0];
        if (measureUnit?.name) Object.assign(measureUnit, { name: { [Op.like]: `%${measureUnit.name}%` } });
        const productPrices = StructureHelper.searchProperty(data, 'productPrices', true)[0];
        if (data?.name) Object.assign(data, { name: { [Op.like]: `%${data.name}%` } });

        const include = [];
        if (measure) include.push({
            model: Measure,
            where: measure
        });

        if (measuresUnit) include.push({
            model: MeasureUnit,
            as: 'measuresUnit',
            where: measuresUnit
        });
        if (measureUnit) include.push({
            model: MeasureUnit,
            as: 'measureUnit',
            where: measureUnit
        });

        if (productPrices) include.push({
            model: ProductPrice,
            as: 'productPrices',
            where: productPrices,
        });

        return this.measureUnitService.findAll({
            where: data,
            include: include,
            ...pagination,
        })
    }

    findOne(uuid: string) {
        return this.measureUnitService.findOne({ where: { uuid } });
    }
}
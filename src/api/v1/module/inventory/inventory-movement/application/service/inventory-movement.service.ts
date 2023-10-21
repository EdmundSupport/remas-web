import { Injectable, Inject } from "@nestjs/common";
import { Op } from "sequelize";
import { fn, literal } from "sequelize";
import { InventoryMovement } from "src/api/v1/datasource/remas/shared/domain/model/inventory/inventory-movement";


@Injectable()
export class InventoryMovementService {
    constructor(
        @Inject('INVENTORY_MOVEMENT_REPOSITORY')
        private inventoryMovementService: typeof InventoryMovement,
    ) { }

    async stock(productUuid: string) {
        const dateToday = new Date();
        const operation = await this.inventoryMovementService.findAll({
            where: { productUuid, date: { [Op.lte]: dateToday } },
            attributes: [
                [
                    fn('SUM', literal('amount')),
                    'total',
                ],
            ],
        });
        return operation[0].get('total') as number;
    }
    // findAll(data?: Partial<MeasureUnitDto>) {
    //     data = JSON.parse(JSON.stringify(data));
    //     const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
    //     const measure = StructureHelper.searchProperty(data, 'measure', true)[0];
    //     if (measure?.name) Object.assign(measure, { name: { [Op.like]: `%${measure.name}%` } });
    //     const measuresUnit = StructureHelper.searchProperty(data, 'measuresUnit', true)[0];
    //     if (measuresUnit?.name) Object.assign(measuresUnit, { name: { [Op.like]: `%${measuresUnit.name}%` } });
    //     const measureUnit = StructureHelper.searchProperty(data, 'measureUnit', true)[0];
    //     if (measureUnit?.name) Object.assign(measureUnit, { name: { [Op.like]: `%${measureUnit.name}%` } });
    //     const productPrices = StructureHelper.searchProperty(data, 'productPrices', true)[0];
    //     if (data?.name) Object.assign(data, { name: { [Op.like]: `%${data.name}%` } });

    //     const include = [];
    //     if (measure) include.push({
    //         model: Measure,
    //         where: measure
    //     });

    //     if (measuresUnit) include.push({
    //         model: MeasureUnit,
    //         as: 'measuresUnit',
    //         where: measuresUnit
    //     });
    //     if (measureUnit) include.push({
    //         model: MeasureUnit,
    //         as: 'measureUnit',
    //         where: measureUnit
    //     });

    //     if (productPrices) include.push({
    //         model: ProductPrice,
    //         as: 'productPrices',
    //         where: productPrices,
    //     });

    //     return this.measureUnitService.findAll({
    //         where: data,
    //         include: include,
    //         ...pagination,
    //     })
    // }

    // findOne(uuid: string) {
    //     return this.measureUnitService.findOne({ where: { uuid } });
    // }
}
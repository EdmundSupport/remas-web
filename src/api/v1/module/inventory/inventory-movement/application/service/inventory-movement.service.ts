import { Injectable, Inject } from "@nestjs/common";
import { Op } from "sequelize";
import { fn, literal } from "sequelize";
import { InventoryMovement } from "src/api/v1/datasource/remas/shared/domain/model/inventory/inventory-movement";


@Injectable()
export class InventoryMovementService {
    constructor(
        @Inject('InventoryMovementRepository')
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
}
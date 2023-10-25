import { Inject, Injectable } from "@nestjs/common";
import { FilterResponseHelper } from "shared/filter_response/application/helper/filter_response.helper";
import { StructureHashTable } from "shared/structure/application/hash/structure.hash_table";
import { InventoryMovementService } from "src/api/v1/module/inventory/inventory-movement/application/service/inventory-movement.service";
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class InventoryMovementHelper {
    constructor(
        private inventoryMovementService: InventoryMovementService,
        
        @Inject('INVENTORY_CONFIRM_HASH_TABLE')
        private inventoryConfirmHashTable: StructureHashTable,
    ) { }

    async stockExceeded(productUuid: string, amountRequired: number) {
        const stock = await this.inventoryMovementService.stock(productUuid);
        const stockExceeded = stock < Number(amountRequired);
        if (!stockExceeded) {
            return stockExceeded;
        } else {
            const message = `El product ${productUuid} no tiene el suficiente stock. stock: ${stock}, Requerido: ${amountRequired}.`;
            throw FilterResponseHelper.httpException('ACCEPTED', message);
        }
    }

    async stocksExceeded(amountsRequired: { productUuid: string, amountRequired: number }[]) {
        const stocksExceeded = await Promise.all(amountsRequired.map(async (item, index, array) => {
            const stockExceeded = await this.stockExceeded(item.productUuid, item.amountRequired).catch((error) => true);
            if (stockExceeded) {
                array.splice(index, 1);
                return;
            }

            return {
                productUuid: item.productUuid,
                stock: stockExceeded,
            }
        }));

        if (stocksExceeded?.length > 0) {
            const confirmUuidSend = uuidV4();
            this.inventoryConfirmHashTable.set(confirmUuidSend, true);
            const message = JSON.stringify('Los siguientes productos, no tienen el stock suficiente. \n' + stocksExceeded.map((stockExceeded) => `uuid:${stockExceeded.productUuid}\tstock:${stockExceeded.stock}`).join('\n'));
            throw FilterResponseHelper.httpException('ACCEPTED', message, { stocksExceeded, confirmUuid: confirmUuidSend });
        }

        return true;
    }
}
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AaaConnectionHelper } from "./application/helper/aaa.connection.helper";
import { aaaConnectionProvider, aaaModels } from "./application/providers/aaa.connection.provider";
import { BillingConnectionHelper, GuatemalaConnectionHelper, IdentityConnectionHelper, InventoryConnectionHelper, ContactConnectionHelper } from "./application/helper/connection.helper";
import { identityConnectionProvider, identityModels } from "./application/providers/identity.connection.provider";
import { inventoryConnectionProvider, inventoryModels } from "./application/providers/inventory.connection.provider";
import { guatemalaModels } from "./application/providers/guatemala.connection.provider";
import { billingConnectionProvider, billingModels } from "./application/providers/billing.connection.provider";
import { contactModels } from "./application/providers/contact.connection.provider";

@Module({
    imports: [
        SequelizeModule.forRootAsync({ useClass: AaaConnectionHelper }),
        SequelizeModule.forFeature(aaaModels),

        SequelizeModule.forRootAsync({ useClass: ContactConnectionHelper, name: 'contact' }),
        SequelizeModule.forFeature(contactModels, 'contact'),

        SequelizeModule.forRootAsync({ useClass: IdentityConnectionHelper, name: 'identity' }),
        SequelizeModule.forFeature(identityModels, 'identity'),

        SequelizeModule.forRootAsync({ useClass: InventoryConnectionHelper, name: 'inventory' }),
        SequelizeModule.forFeature(inventoryModels, 'inventory'),

        SequelizeModule.forRootAsync({ useClass: GuatemalaConnectionHelper, name: 'guatemala' }),
        SequelizeModule.forFeature(guatemalaModels, 'guatemala'),

        SequelizeModule.forRootAsync({ useClass: BillingConnectionHelper, name: 'billing' }),
        SequelizeModule.forFeature(billingModels, 'billing'),
    ],
    providers: [
        ...aaaConnectionProvider,
        ...identityConnectionProvider,
        ...billingConnectionProvider,
        ...inventoryConnectionProvider,
    ],
    exports: [
        ...aaaConnectionProvider,
        ...identityConnectionProvider,
        ...billingConnectionProvider,
        ...inventoryConnectionProvider,
    ]
})
export class ConnectionModule { }
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AaaConnectionHelper } from "./application/helper/aaa.connection.helper";
import { aaaConnectionProvider } from "./application/providers/aaa.connection.provider";
import { BillingConnectionHelper, GuatemalaConnectionHelper, IdentityConnectionHelper, InventoryConnectionHelper, ContactConnectionHelper } from "./application/helper/connection.helper";
import { identityConnectionProvider, identityModels } from "./application/providers/identity.connection.provider";
import { inventoryConnectionProvider, inventoryModels } from "./application/providers/inventory.connection.provider";
import { guatemalaModels } from "./application/providers/guatemala.connection.provider";
import { billingConnectionProvider, billingModels } from "./application/providers/billing.connection.provider";
import { contactModels } from "./application/providers/contact.connection.provider";
import { models } from "./application/providers/connection.provider";
import { RemasHelper } from "../shared/application/helper/remas.helper";

@Module({
    imports: [
        SequelizeModule.forRootAsync({ useClass: AaaConnectionHelper }),
        SequelizeModule.forFeature(models),

        SequelizeModule.forRootAsync({ useClass: ContactConnectionHelper, name: 'contact' }),
        SequelizeModule.forFeature(models, 'contact'),

        SequelizeModule.forRootAsync({ useClass: IdentityConnectionHelper, name: 'identity' }),
        SequelizeModule.forFeature(models, 'identity'),

        SequelizeModule.forRootAsync({ useClass: InventoryConnectionHelper, name: 'inventory' }),
        SequelizeModule.forFeature(models, 'inventory'),

        SequelizeModule.forRootAsync({ useClass: GuatemalaConnectionHelper, name: 'guatemala' }),
        SequelizeModule.forFeature(models, 'guatemala'),

        SequelizeModule.forRootAsync({ useClass: BillingConnectionHelper, name: 'billing' }),
        SequelizeModule.forFeature(models, 'billing'),
    ],
    providers: [
        ...aaaConnectionProvider,
        ...identityConnectionProvider,
        ...billingConnectionProvider,
        ...inventoryConnectionProvider,
        RemasHelper,
    ],
    exports: [
        ...aaaConnectionProvider,
        ...identityConnectionProvider,
        ...billingConnectionProvider,
        ...inventoryConnectionProvider,
        RemasHelper,
    ]
})
export class ConnectionModule { }
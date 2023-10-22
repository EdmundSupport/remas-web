import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AaaConnectionHelper } from "./application/helper/aaa.connection.helper";
import { BillingConnectionHelper, GuatemalaConnectionHelper, IdentityConnectionHelper, InventoryConnectionHelper, ContactConnectionHelper } from "./application/helper/connection.helper";
import { RemasHelper } from "../shared/application/helper/remas.helper";
import { connectionProvider as connectionProviderAaa, models as modelsAaa } from "./application/provider/aaa/connection.provider";
import { connectionProvider as connectionProviderBilling, models as modelsBilling } from "./application/provider/billing/connection.provider";
import { connectionProvider as connectionProviderContact, models as modelsContact } from "./application/provider/contact/connection.provider";
import { connectionProvider as connectionProviderGuatemala, models as modelsGuatemala } from "./application/provider/guatemala/connection.provider";
import { connectionProvider as connectionProviderIdentity, models as modelsIdentity } from "./application/provider/identity/connection.provider";
import { connectionProvider as connectionProviderInventory, models as modelsInventory } from "./application/provider/inventory/connection.provider";

const repositories = [
    ...connectionProviderAaa,
    ...connectionProviderBilling,
    ...connectionProviderContact,
    ...connectionProviderIdentity,
    ...connectionProviderGuatemala,
    ...connectionProviderInventory,
];

const models = [
    ...modelsAaa,
    ...modelsBilling,
    ...modelsContact,
    ...modelsIdentity,
    ...modelsGuatemala,
    ...modelsInventory,
];

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
        ...repositories,
        RemasHelper,
    ],
    exports: [
        ...repositories,
        RemasHelper,
    ]
})
export class ConnectionModule { }
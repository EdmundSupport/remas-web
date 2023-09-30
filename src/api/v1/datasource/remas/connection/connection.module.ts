import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role, User, Module as RemasAAAModule, Privilege, Permission, TokenDisabled, SessionType, Session as RemasAAASession } from "../shared";
import { AaaConnectionHelper } from "./application/helper/aaa.connection.helper";
import { aaaConnectionProvider, models } from "./application/providers/aaa.connection.provider";

@Module({
    imports: [
        SequelizeModule.forRootAsync({ useClass: AaaConnectionHelper }),
        SequelizeModule.forFeature(models),
    ],
    providers: [
        ...aaaConnectionProvider,
    ],
    exports: [
        ...aaaConnectionProvider,
    ]
})
export class ConnectionModule { }
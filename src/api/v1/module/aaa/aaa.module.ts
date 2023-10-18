import { Inject, Module, OnModuleInit } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DatasourceModule } from "src/api/v1/datasource/datasource.module";
import { AuthHelper, AuthService } from "./application";
import { StructureHashTable } from "shared/structure/application/hash/structure.hash_table";
import { AuthController } from "./infrastructure";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { AuthzService } from "./application/service/authz.service";
import { AuthzController } from "./infrastructure/controller/authz.controller";
import { RoleModule } from "./role/role.module";
import { ModuleModule } from "./module/module.module";

@Module({
    imports: [
        DatasourceModule,
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const tokenAccessConfig = JSON.parse(configService.get('TOKEN_ACCESS_CONFIG'));
                return {
                    signOptions: { expiresIn: tokenAccessConfig.expiresIn },
                }
            },
        }),
        UserModule,
        RoleModule,
        ModuleModule,
    ],
    providers: [
        {
            provide: 'TOKEN_DISABLED',
            useClass: StructureHashTable,
        },
        AuthHelper,
        AuthService,
        AuthzService,
    ],
    controllers: [
        AuthController,
        AuthzController,
    ],
    exports: [
        AuthService,
        AuthzService,
        UserModule,
        RoleModule,
        ModuleModule,
    ]
})
export class AAAModule { }
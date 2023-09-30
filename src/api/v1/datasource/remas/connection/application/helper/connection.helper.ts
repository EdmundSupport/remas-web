import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions, SequelizeOptionsFactory } from "@nestjs/sequelize";

@Injectable()
export class ConnectionHelper {
    constructor(
        @Inject(ConfigService)
        private readonly config: ConfigService,
    ) { }


    init(schema: string) {
        return {
            dialect: this.config.get('REMAS_DIALECT'),
            host: this.config.get<string>('REMAS_HOST'),
            port: this.config.get<number>('REMAS_PORT'),
            username: this.config.get<string>('REMAS_USER'),
            password: this.config.get<string>('REMAS_PASS'),
            database: this.config.get<string>('REMAS_DB'),
            schema,
            models: [],
            autoLoadModels: true,
            synchronize: false, // never use TRUE in production!
            logging: false,
        };
    }
}

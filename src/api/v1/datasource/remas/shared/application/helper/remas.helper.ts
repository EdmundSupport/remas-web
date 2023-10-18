import { ConfigService } from "@nestjs/config";
import { ConnectionHelper } from "../../../connection/application/helper/connection.helper";
import { Inject, Injectable } from "@nestjs/common";
import { QueryOptions, Sequelize } from 'sequelize';

@Injectable()
export class RemasHelper {
    constructor(
        private configService: ConfigService,
    ) { }

    raw(schemaLocal?: string) {
        const connection = new ConnectionHelper(this.configService).init(schemaLocal);
        const { host, database, username, password, dialect, schema } = connection;
        const sequelize = new Sequelize(database, username, password, {
            dialect,
            schema,
            host
        });
        return sequelize;
    }
}
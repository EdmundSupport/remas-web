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
            name: schema == 'aaa' ? undefined : schema,
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

@Injectable()
export class AaaConnectionHelper implements SequelizeOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;
  
  public createSequelizeOptions(): SequelizeModuleOptions {
    const connectionHelperWithSchema = new ConnectionHelper(this.configService).init(this.configService.get<string>('REMAS_AAA'));
    return connectionHelperWithSchema;
  }
}

@Injectable()
export class ContactConnectionHelper implements SequelizeOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;
  
  public createSequelizeOptions(): SequelizeModuleOptions {
    const connectionHelperWithSchema = new ConnectionHelper(this.configService).init(this.configService.get<string>('REMAS_CONTACT'));
    return connectionHelperWithSchema;
  }
}

@Injectable()
export class IdentityConnectionHelper implements SequelizeOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;
  
  public createSequelizeOptions(): SequelizeModuleOptions {
    const connectionHelperWithSchema = new ConnectionHelper(this.configService).init(this.configService.get<string>('REMAS_IDENTITY'));
    return connectionHelperWithSchema;
  }
}

@Injectable()
export class InventoryConnectionHelper implements SequelizeOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;
  
  public createSequelizeOptions(): SequelizeModuleOptions {
    const connectionHelperWithSchema = new ConnectionHelper(this.configService).init(this.configService.get<string>('REMAS_INVENTORY'));
    return connectionHelperWithSchema;
  }
}

@Injectable()
export class GuatemalaConnectionHelper implements SequelizeOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;
  
  public createSequelizeOptions(): SequelizeModuleOptions {
    const connectionHelperWithSchema = new ConnectionHelper(this.configService).init(this.configService.get<string>('REMAS_GUATEMALA'));
    return connectionHelperWithSchema;
  }
}

@Injectable()
export class BillingConnectionHelper implements SequelizeOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;
  
  public createSequelizeOptions(): SequelizeModuleOptions {
    const connectionHelperWithSchema = new ConnectionHelper(this.configService).init(this.configService.get<string>('REMAS_BILLING'));
    return connectionHelperWithSchema;
  }
}


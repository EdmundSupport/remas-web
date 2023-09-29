import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions, SequelizeOptionsFactory } from "@nestjs/sequelize";
import { ConnectionHelper } from "./connection.helper";

@Injectable()
export class AaaConnectionHelper implements SequelizeOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;
  
  public createSequelizeOptions(): SequelizeModuleOptions {
    const connectionHelperWithSchema = new ConnectionHelper(this.configService).init(this.configService.get<string>('REMAS_AAA'));
    return connectionHelperWithSchema;
  }
}

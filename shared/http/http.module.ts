import { HttpModule as AxiosHttpModule, HttpService } from '@nestjs/axios';
import { Global, HttpException, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from 'shared/log/log.module';
import { HttpHelper } from './application/helper/http.helper';
import { LogHelper } from 'shared/log/application/helper/log.helper';
import { ConsoleColorEnum } from 'shared/log/domain/enum/console_color.enum';

@Global()
@Module({
  imports: [
    AxiosHttpModule,
    ConfigModule,
    LogModule,
  ],
  exports: [
    AxiosHttpModule,
  ],
})
export class HttpModule extends AxiosHttpModule implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
  ) {
    super();
  }

  public onModuleInit(): any {
    const axios = this.httpService.axiosRef;
    axios.interceptors.request.use((req) => {
      console.group(ConsoleColorEnum.white, new Date().toLocaleString(), ConsoleColorEnum.green, `[REQUEST]`, `[${req.method.toUpperCase()}]`, `[${req.url}]`);
      console.groupEnd();
      return req;
    });
    axios.interceptors.response.use(
      (response) => {
        LogHelper.printSuccess(response.config.method, response.config.url, response.status);
        return response.data;
      },
      (error: any) => {
        const statusCode = error?.response?.status ?? error?.response?.data?.statusCode;
        const message = HttpHelper.urlMap(error.config.url, error.config.method) ?? error?.response?.data?.message ?? 'Se realizo una peticion externa, pero no se pudo recuperar el error.';
        LogHelper.printError(error.config.method.toUpperCase(), error.config.url, error.response.status, {message, data: error.response.data});        
        throw new HttpException({statusCode, message}, statusCode);
      },
    );
  }
}
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LogMiddleware } from 'shared/log/infrastructure/middleware/log.middleware';
import { HttpModule } from 'shared/http/http.module';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    ApiModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      .forRoutes(``);
  }
}

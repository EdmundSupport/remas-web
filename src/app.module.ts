import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LogMiddleware } from 'shared/log/infrastructure/middleware/log.middleware';
import { HttpModule } from 'shared/http/http.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      .forRoutes(``);
  }
}

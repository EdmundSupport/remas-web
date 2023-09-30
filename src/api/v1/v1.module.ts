import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LogMiddleware } from 'shared/log/infrastructure/middleware/log.middleware';
import { HttpModule } from 'shared/http/http.module';
import { ConfigModule } from '@nestjs/config';
import { ModuleModule } from './module';
import { DatasourceModule } from './datasource';

@Module({
    imports: [
        DatasourceModule,
        ModuleModule,
    ],
    exports: [
        DatasourceModule,
        ModuleModule,
    ]
})
export class V1Module { }

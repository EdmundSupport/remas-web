import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { ModuleService } from './application/service/module.service';
import { ModuleController } from './infrastructure/controller/module.controller';

@Module({
    imports: [
        DatasourceModule,
    ],
    providers: [
        ModuleService,
    ],
    controllers: [
        ModuleController,
    ],
    exports: [
        ModuleService,
    ]
})
export class ModuleModule { }
import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { MaintenanceController } from './infrastructure/controller/maintenance.controller';
import { MaintenanceService } from './application/service/maintenance.service';
import { ExportModule } from 'shared/export/export.module';

@Module({
    imports: [
        DatasourceModule,
        ExportModule,
    ],
    providers: [
        MaintenanceService,
    ],
    controllers: [
        MaintenanceController,
    ],
    exports: [
        MaintenanceService,
    ]
})
export class MaintenanceModule { }
import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { MaintenanceController } from './infrastructure/controller/maintenance.controller';
import { MaintenanceService } from './application/service/maintenance.service';
import { ExportModule } from 'shared/export/export.module';
import { MaintenanceTrackingModule } from './dependence/maintenance-tracking/maintenance-traking.module';

@Module({
    imports: [
        DatasourceModule,
        ExportModule,
        MaintenanceTrackingModule,
    ],
    providers: [
        MaintenanceService,
    ],
    controllers: [
        MaintenanceController,
    ],
    exports: [
        MaintenanceService,
        MaintenanceTrackingModule
    ]
})
export class MaintenanceModule { }
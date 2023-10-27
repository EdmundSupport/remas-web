import { Module, forwardRef } from '@nestjs/common';
import { MaintenanceTrackingService } from './application/service/maintenance-tracking.service';
import { MaintenanceTrackingController } from './infrastructure/controller/maintenance_tracking.controller';
import { DatasourceModule } from 'src/api/v1/datasource';
import { ModuleModule } from 'src/api/v1/module/module.module';
import { StructureHashTable } from 'shared/structure';

@Module({
    imports: [
        forwardRef(() => DatasourceModule),
        forwardRef(() => ModuleModule),
    ],
    providers: [
        MaintenanceTrackingService,
    ],
    controllers: [
        MaintenanceTrackingController,
    ],
    exports: [
        MaintenanceTrackingService,
    ],
})
export class MaintenanceTrackingModule { }
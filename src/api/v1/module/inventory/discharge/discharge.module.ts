import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { DischargeController } from './infrastructure/controller/discharge.controller';
import { DischargeService } from './application/service/discharge.service';
import { ExportModule } from 'shared/export/export.module';

@Module({
    imports: [
        DatasourceModule,
        ExportModule,
    ],
    providers: [
        DischargeService,
    ],
    controllers: [
        DischargeController,
    ],
    exports: [
        DischargeService,
    ]
})
export class DischargeModule { }
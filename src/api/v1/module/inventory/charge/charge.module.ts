import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { ChargeController } from './infrastructure/controller/charge.controller';
import { ChargeService } from './application/service/charge.service';
import { ExportModule } from 'shared/export/export.module';

@Module({
    imports: [
        DatasourceModule,
        ExportModule,
    ],
    providers: [
        ChargeService,
    ],
    controllers: [
        ChargeController,
    ],
    exports: [
        ChargeService,
    ]
})
export class ChargeModule { }
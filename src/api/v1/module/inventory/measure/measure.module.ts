import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { MeasureService } from './application/service/measure.service';
import { MeasureController } from './infrastructure/controller/measure.controller';

@Module({
    imports: [
        DatasourceModule,
    ],
    providers: [
        MeasureService,
    ],
    controllers: [
        MeasureController,
    ],
    exports: [
        MeasureService,
    ]
})
export class MeasureModule { }
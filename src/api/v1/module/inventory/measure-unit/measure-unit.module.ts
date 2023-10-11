import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { MeasureUnitService } from './application/service/measure-unit.service';
import { MeasureUnitController } from './infrastructure/controller/measure-unit.controller';

@Module({
    imports: [
        DatasourceModule,
    ],
    providers: [
        MeasureUnitService,
    ],
    controllers: [
        MeasureUnitController,
    ],
    exports: [
        MeasureUnitService,
    ]
})
export class MeasureUnitModule { }
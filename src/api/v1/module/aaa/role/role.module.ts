import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { RoleService } from './application/service/role.service';
import { RoleController } from './infrastructure/controller/role.controller';

@Module({
    imports: [
        DatasourceModule,
    ],
    providers: [
        RoleService,
    ],
    controllers: [
        RoleController,
    ],
    exports: [
        RoleService,
    ]
})
export class RoleModule { }
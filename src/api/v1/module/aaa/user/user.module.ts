import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/api/v1/datasource';
import { UserService } from './application/service/user.service';
import { UserController } from './infrastructure/controller/user.controller';

@Module({
    imports: [
        DatasourceModule,
    ],
    providers: [
        UserService,
    ],
    controllers: [
        UserController,
    ],
    exports: [
        UserService,
    ]
})
export class UserModule { }
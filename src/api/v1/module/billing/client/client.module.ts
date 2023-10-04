import { Module } from '@nestjs/common';
import { ClientHelper, ClientService } from './application';
import { DatasourceModule } from 'src/api/v1/datasource';
import { ClientController } from './infrastructure';

@Module({
    imports: [
        DatasourceModule,
    ],
    providers: [
        ClientHelper,
        ClientService,
    ],
    controllers: [
        ClientController,
    ],
    exports: [
        ClientHelper,
        ClientService,
    ]
})
export class ClientModule { }
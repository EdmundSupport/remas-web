import { Module } from "@nestjs/common";
import { RemasModule } from "./remas/remas.module";
@Module({
    imports: [
        RemasModule,
    ],
    exports: [
        RemasModule,
    ]
})
export class DatasourceModule { }
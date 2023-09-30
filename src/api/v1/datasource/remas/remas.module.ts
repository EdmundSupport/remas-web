import { Module } from "@nestjs/common";
import { ConnectionModule } from ".";

@Module({
    imports: [
        ConnectionModule,
    ],
    exports: [
        ConnectionModule,
    ]
})
export class RemasModule { }
import { Module } from "@nestjs/common";
import { ExpirenmentModule } from ".";
@Module({
    imports: [
        ExpirenmentModule,
    ],
    exports: [
        ExpirenmentModule,
    ],
})
export class ModuleModule { }
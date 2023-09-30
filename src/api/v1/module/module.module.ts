import { Module } from "@nestjs/common";
import { AAAModule } from "./aaa";
@Module({
    imports: [
        AAAModule,
    ],
    exports: [
        AAAModule,
    ],
})
export class ModuleModule { }
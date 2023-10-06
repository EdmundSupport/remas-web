import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from "./infrastructure/component/app.component";
import { AppRoutingModule } from "./app-routing.module";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from "@angular/common";
import { ToolBarComponent } from "src/app/shared/component/tool_bar/infrastructure/component/tool_bar.component";
import { CardModuleComponent } from "src/app/shared/component/card_module/infrastructure/component/card_module.component";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,

        CommonModule,

        ToolBarComponent,
        CardModuleComponent,
    ],
})
export class AppModule { }
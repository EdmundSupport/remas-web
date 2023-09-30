import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from "./infrastructure/component/app.component";
import { AppRoutingModule } from "./app-routing.module";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from "@angular/common";

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
    ],
})
export class AppModule { }
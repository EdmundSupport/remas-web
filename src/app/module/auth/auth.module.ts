import { NgModule } from "@angular/core";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthComponent } from "./infrastructure/component/auth.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        AuthRoutingModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,

        FormsModule,
        CommonModule,
    ],
})
export class AuthModule { }
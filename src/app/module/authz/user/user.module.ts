// import { UserFormComponent } from "./infrastructure/component/user-form.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from "@angular/core";
import { UserComponent } from "./infrastructure/component/user.component";
import { UserFormComponent } from "./infrastructure/component/user-form.component";
import { UserRoutingModule } from "./user-routing.module";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SuperpositionLoadingComponent } from "src/app/shared/component/superposition-loading/infrastructure/component/superposition-loading.component";
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ButtonFloatComponent } from "src/app/shared/component/button-float/infrastructure/component/button-float.component";
@NgModule({
    declarations: [
        UserComponent,
        UserFormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatSnackBarModule,
        UserRoutingModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatSlideToggleModule,
        SuperpositionLoadingComponent,
        ButtonFloatComponent,
    ]
})
export class UserModule { }
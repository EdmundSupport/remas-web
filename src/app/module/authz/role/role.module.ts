// import { RoleFormComponent } from "./infrastructure/component/role-form.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from "@angular/core";
import { RoleComponent } from "./infrastructure/component/role.component";
import { RoleFormComponent } from "./infrastructure/component/role-form.component";
import { RoleRoutingModule } from "./role-routing.module";
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
        RoleComponent,
        RoleFormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatSnackBarModule,
        RoleRoutingModule,
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
export class RoleModule { }
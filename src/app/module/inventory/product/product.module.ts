// import { ProductFormComponent } from "./infrastructure/component/product-form.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from "@angular/core";
import { ProductComponent } from "./infrastructure/component/product.component";
import { ProductFormComponent } from "./infrastructure/component/product-form.component";
import { ProductMaintenanceStepComponent } from "./infrastructure/component/product-maintenance-step.component";
import { ProductRoutingModule } from "./product-routing.module";
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
import { ProductMaintenanceStepDetailComponent } from "./infrastructure/component/product-maintenance-step-detail.component";
@NgModule({
    declarations: [
        ProductComponent,
        ProductFormComponent,
        ProductMaintenanceStepComponent,
        ProductMaintenanceStepDetailComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatSnackBarModule,
        ProductRoutingModule,
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
        SuperpositionLoadingComponent,
    ]
})
export class ProductModule { }
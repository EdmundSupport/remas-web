// import { ProductFormComponent } from "./infrastructure/component/product-form.component";
import { AutocompleteModule } from "src/app/shared/component/autocomplete/autocomplete.module";
import { ButtonFloatComponent } from "src/app/shared/component/button-float/infrastructure/component/button-float.component";
import { CalendarModule } from "src/app/shared/component/calendar/calendar.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgFor, AsyncPipe } from '@angular/common';
import { NgModule } from "@angular/core";
import { ProductComponent } from "./infrastructure/component/product.component";
// import { ProductFormDetailComponent } from "./infrastructure/component/product-form-detail.component";
import { ProductRoutingModule } from "./product-routing.module";
import { SuperpositionLoadingComponent } from "src/app/shared/component/superposition-loading/infrastructure/component/superposition-loading.component";
@NgModule({
    declarations: [
        ProductComponent,
        // ProductFormComponent,
        // ProductFormDetailComponent,
    ],
    imports: [        
        AutocompleteModule,
        ButtonFloatComponent,
        CalendarModule,
        CommonModule,
        FormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        ProductRoutingModule,
        ReactiveFormsModule,
        SuperpositionLoadingComponent,

    ]
})
export class ProductModule { }
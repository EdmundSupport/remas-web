import { NgModule } from "@angular/core";
import { QuotationComponent } from "./infrastructure/component/quotation.component";
import { QuotationRoutingModule } from "./quotation-routing.module";
import { CalendarModule } from "src/app/shared/component/calendar/calendar.module";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { QuotationFormComponent } from "./infrastructure/component/quotation-form.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteModule } from "src/app/shared/component/autocomplete/autocomplete.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { QuotationFormDetailComponent } from "./infrastructure/component/quotation-form-detail.component";
import { ButtonFloatComponent } from "src/app/shared/component/button-float/infrastructure/component/button-float.component";
import { SuperpositionLoadingComponent } from "src/app/shared/component/superposition-loading/infrastructure/component/superposition-loading.component";
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from "@angular-material-components/datetime-picker";
@NgModule({
    declarations: [
        QuotationComponent,
        QuotationFormComponent,
        QuotationFormDetailComponent,
    ],
    imports: [
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,

        ReactiveFormsModule,

        NgxMatNativeDateModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,

        FormsModule,
        CommonModule,
        CalendarModule,
        QuotationRoutingModule,
        AutocompleteModule,
        ButtonFloatComponent,
        SuperpositionLoadingComponent,

    ]
})
export class QuotationModule { }
import { NgModule } from "@angular/core";
import { DischargeComponent } from "./infrastructure/component/discharge.component";
import { DischargeRoutingModule } from "./discharge-routing.module";
import { CalendarModule } from "src/app/shared/component/calendar/calendar.module";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { DischargeFormComponent } from "./infrastructure/component/discharge-form.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteModule } from "src/app/shared/component/autocomplete/autocomplete.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DischargeFormScheduledComponent } from "./infrastructure/component/discharge-form-scheduled.component";
import { DischargeFormDetailComponent } from "./infrastructure/component/discharge-form-detail.component";
import { ButtonFloatComponent } from "src/app/shared/component/button-float/infrastructure/component/button-float.component";
import { SuperpositionLoadingComponent } from "src/app/shared/component/superposition-loading/infrastructure/component/superposition-loading.component";
import { NgxMatNativeDateModule, NgxMatDatetimePickerModule, NgxMatTimepickerModule } from "@angular-material-components/datetime-picker";
@NgModule({
    declarations: [
        DischargeComponent,
        DischargeFormComponent,
        DischargeFormScheduledComponent,
        DischargeFormDetailComponent,
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

        NgxMatNativeDateModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        
        
        ReactiveFormsModule,


        FormsModule,
        CommonModule,
        CalendarModule,
        DischargeRoutingModule,
        AutocompleteModule,
        ButtonFloatComponent,
        SuperpositionLoadingComponent,

    ]
})
export class DischargeModule { }
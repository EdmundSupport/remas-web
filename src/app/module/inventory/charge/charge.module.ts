import { NgModule } from "@angular/core";
import { ChargeComponent } from "./infrastructure/component/charge.component";
import { ChargeRoutingModule } from "./charge-routing.module";
import { CalendarModule } from "src/app/shared/component/calendar/calendar.module";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ChargeFormComponent } from "./infrastructure/component/charge-form.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteModule } from "src/app/shared/component/autocomplete/autocomplete.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ChargeFormScheduledComponent } from "./infrastructure/component/charge-form-scheduled.component";
import { ChargeFormDetailComponent } from "./infrastructure/component/charge-form-detail.component";
import { ButtonFloatComponent } from "src/app/shared/component/button-float/infrastructure/component/button-float.component";
import { SuperpositionLoadingComponent } from "src/app/shared/component/superposition-loading/infrastructure/component/superposition-loading.component";
@NgModule({
    declarations: [
        ChargeComponent,
        ChargeFormComponent,
        ChargeFormScheduledComponent,
        ChargeFormDetailComponent,
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


        FormsModule,
        CommonModule,
        CalendarModule,
        ChargeRoutingModule,
        AutocompleteModule,
        ButtonFloatComponent,
        SuperpositionLoadingComponent,

    ]
})
export class ChargeModule { }
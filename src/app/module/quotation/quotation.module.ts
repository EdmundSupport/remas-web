import { NgModule } from "@angular/core";
import { QuotationComponent } from "./infrastructure/component/quotation.component";
import { QuotationRoutingModule } from "./quotation-routing.module";
import { CalendarModule } from "src/app/shared/component/calendar/calendar.module";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { QuotationCreateComponent } from "./infrastructure/component/quotation-create.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@NgModule({
    declarations: [
        QuotationComponent,
        QuotationCreateComponent,
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

        FormsModule,
        CommonModule,
        CalendarModule,
        QuotationRoutingModule,
    ]
})
export class QuotationModule { }
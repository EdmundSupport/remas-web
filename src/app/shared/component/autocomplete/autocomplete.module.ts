import { NgModule } from "@angular/core";
import { CalendarModule } from "src/app/shared/component/calendar/calendar.module";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AutocompleteComponent } from "./infrastructure/component/autocomplete.component";

@NgModule({
    declarations: [
        AutocompleteComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,

        FormsModule,
        CommonModule,
        CalendarModule,
    ],
    exports: [
        AutocompleteComponent,
    ]
})
export class AutocompleteModule { }
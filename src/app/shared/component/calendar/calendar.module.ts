import { NgModule } from "@angular/core";
import { CalendarModule as AngularCalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FlatpickrModule } from "angularx-flatpickr";
import { CalendarComponent } from "./infrastructure/component/calendar.component";
import { ButtonFloatComponent } from "../button-float/infrastructure/component/button-float.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
        CalendarComponent,
    ],
    imports: [
        ButtonFloatComponent,
        CommonModule,
        FormsModule,
        AngularCalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        FlatpickrModule.forRoot(),
        MatIconModule
    ],
    exports: [
        CalendarComponent,
    ]
})
export class CalendarModule { }
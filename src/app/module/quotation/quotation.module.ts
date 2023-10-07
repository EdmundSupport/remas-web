import { NgModule } from "@angular/core";
import { QuotationComponent } from "./infrastructure/component/quotation.component";
import { QuotationRoutingModule } from "./quotation-routing.module";
import { CalendarModule } from "src/app/shared/component/calendar/calendar.module";
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        QuotationComponent,
    ],
    imports: [
        MatSnackBarModule,
        CalendarModule,
        QuotationRoutingModule,
    ]
})
export class QuotationModule { }
import { NgModule } from "@angular/core";
import { QuotationComponent } from "./infrastructure/component/quotation.component";
import { QuotationRoutingModule } from "./quotation-routing.module";
import { CalendarModule } from "src/app/shared/component/calendar/calendar.module";

@NgModule({
    declarations: [
        QuotationComponent,
    ],
    imports: [
        CalendarModule,
        QuotationRoutingModule,
    ]
})
export class QuotationModule { }
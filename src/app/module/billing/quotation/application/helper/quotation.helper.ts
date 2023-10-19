import { HttpClient } from "@angular/common/http";
import { colors } from "src/app/shared/color/domain/constant/color.constant";

export class QuotationHelper {
    constructor(
        private httpService: HttpClient,
    ) { }

    // onQuotationsToEvent(quotations: {}[]|{}){
    //     if(Array.isArray(quotations)) quotations = [quotations];
    //     (quotations as []).map((quotation)=>{

    //         return {
    //             start: quotation.date,
    //             title: `${quotation.date} | ${quotation.number} | ${quotation.tributeCode} | ${quotation.client.name}`,
    //             color: { ...colors['red'] },
    //             // actions: this.actions,
    //             allDay: true,
    //             resizable: {
    //                 beforeStart: true,
    //                 afterEnd: true,
    //             },
    //             draggable: true,
    //         };
    //     });
        
    //     if(Array.isArray(quotations)) quotations = [quotation];
    // }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class QuotationTrackingService {
    url = environment.apiAuth;

    constructor(
        private httpService: HttpClient,
    ) { }

    onConfirm(quotationUuid: string) {
        return this.httpService.patch(this.url + '/v1/quotation/tracking/confirm/' + quotationUuid, undefined).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            map((result: any) => {
                if (result?.statusCode && result?.statusCode != 200) {
                    return result;
                }
                return result.data;
            })
        );
    }
}
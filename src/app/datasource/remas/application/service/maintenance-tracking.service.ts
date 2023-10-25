import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MaintenanceTrackingService {
    url = environment.apiAuth;

    constructor(
        private httpService: HttpClient,
    ) { }

    onConfirm(quotationUuid: string) {
        return this.httpService.patch(this.url + '/v1/maintenance/tracking/confirm/' + quotationUuid, undefined).pipe(
            catchError((result) => new Observable(observer => {
                console.log("🚀 ~ file: maintenance-tracking.service.ts:20 ~ QuotationTrackingService ~ catchError ~ result:", result)
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

    onFinalized(quotationUuid: string) {
        return this.httpService.patch(this.url + '/v1/maintenance/tracking/finalized/' + quotationUuid, undefined).pipe(
            catchError((result) => new Observable(observer => {
                console.log("🚀 ~ file: maintenance-tracking.service.ts:36 ~ MaintenanceTrackingService ~ catchError ~ result:", result)
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

    onSend(quotationUuid: string) {
        window.open(this.url + '/v1/quotation/export/' + quotationUuid + '/pdf');
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class QuotationService {
    url = environment.apiAuth;
    onFind$ = new BehaviorSubject<boolean>(false);

    constructor(
        private httpService: HttpClient,
    ) { }

    onFind(filter: {}): Observable<any> {
        this.onFind$.next(true);
        return this.httpService.get(this.url + '/v1/quotation').pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            finalize(() => {
                this.onFind$.next(false);
            })
        );
    }
}
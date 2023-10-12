import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { QuotationInterface } from "../../domain/interface/quotation.interface";

@Injectable({
    providedIn: 'root',
})
export class QuotationService {
    url = environment.apiAuth;
    onCreateLoad$ = new BehaviorSubject<boolean>(false);
    onFindLoad$ = new BehaviorSubject<boolean>(false);

    constructor(
        private httpService: HttpClient,
    ) { }

    onCreate(){
        this.onCreateLoad$.next(true);
        return this.httpService.post(this.url + '/v1/quotation', {}).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            finalize(() => {
                this.onCreateLoad$.next(false);
            })
        );
    }

    onFind(filter: Partial<QuotationInterface>): Observable<any> {
        this.onFindLoad$.next(true);
        return this.httpService.get(this.url + '/v1/quotation').pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            finalize(() => {
                this.onFindLoad$.next(false);
            })
        );
    }
}
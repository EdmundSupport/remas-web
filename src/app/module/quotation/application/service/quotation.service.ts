import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { QuotationInterface } from "../../domain/interface/quotation.interface";
import { CreateQuotationInterface } from "../../domain/interface/create-quotation.interface";

@Injectable({
    providedIn: 'root',
})
export class QuotationService {
    url = environment.apiAuth;

    constructor(
        private httpService: HttpClient,
    ) { }

    onCreate(data: CreateQuotationInterface){
        return this.httpService.post(this.url + '/v1/quotation', data).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }

    onFind(filter: Partial<QuotationInterface>): Observable<any> {
        return this.httpService.get(this.url + '/v1/quotation').pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }
}
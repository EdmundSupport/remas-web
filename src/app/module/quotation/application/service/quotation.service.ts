import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CreateQuotationInterface } from "../../domain/interface/create-quotation.interface";
import { SerializeHelper } from "src/app/shared/serialize/application/helper/serialize.helper";
import { QuotationInterface } from "src/app/datasource/remas/domain/interface/quotation.interface";
import { FindQuotationInterface } from "../../domain/interface/find-quotation.interface";

@Injectable({
    providedIn: 'root',
})
export class QuotationService {
    url = environment.apiAuth;

    constructor(
        private httpService: HttpClient,
    ) { }

    onCreate(data: CreateQuotationInterface) {
        return this.httpService.post(this.url + '/v1/quotation', data).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }

    onFind(quotation: Partial<FindQuotationInterface>): Observable<any> {
        const queryParams = SerializeHelper.objectToQueryParams(quotation);
        return this.httpService.get(this.url + '/v1/quotation' + queryParams).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }

    onFindOne(uuid: string): Observable<any> {
        return this.httpService.get(this.url + '/v1/quotation/' + uuid).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }
}
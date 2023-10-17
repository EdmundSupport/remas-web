import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SerializeHelper } from "src/app/shared/serialize/application/helper/serialize.helper";
import { ChargeInterface } from "src/app/datasource/remas/domain/interface/charge.interface";
import { CreateChargeInterface } from "src/app/module/inventory/charge/domain/interface/create-charge.interface";
import { FindChargeInterface } from "src/app/module/inventory/charge/domain/interface/find-charge.interface";

@Injectable({
    providedIn: 'root',
})
export class ChargeService {
    url = environment.apiAuth;

    constructor(
        private httpService: HttpClient,
    ) { }

    onCreate(data: CreateChargeInterface) {
        return this.httpService.post(this.url + '/v1/charge', data).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }

    onFind(charge: Partial<FindChargeInterface>): Observable<any> {
        const queryParams = SerializeHelper.objectToQueryParams(charge);
        return this.httpService.get(this.url + '/v1/charge' + queryParams).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }

    onFindOne(uuid: string): Observable<any> {
        return this.httpService.get(this.url + '/v1/charge/' + uuid).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }

    onUpdate(uuid: string, data: CreateChargeInterface) {
        return this.httpService.patch(this.url + '/v1/charge/' + uuid, data).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }
}
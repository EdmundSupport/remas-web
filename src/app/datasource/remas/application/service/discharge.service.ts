import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SerializeHelper } from "src/app/shared/serialize/application/helper/serialize.helper";
import { DischargeInterface } from "src/app/datasource/remas/domain/interface/discharge.interface";
import { CreateDischargeInterface } from "src/app/module/inventory/discharge/domain/interface/create-discharge.interface";
import { FindDischargeInterface } from "src/app/module/inventory/discharge/domain/interface/find-discharge.interface";

@Injectable({
    providedIn: 'root',
})
export class DischargeService {
    url = environment.apiAuth;

    constructor(
        private httpService: HttpClient,
    ) { }

    onCreate(data: CreateDischargeInterface) {
        return this.httpService.post(this.url + '/v1/discharge', data).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }

    onFind(discharge: Partial<FindDischargeInterface>): Observable<any> {
        const queryParams = SerializeHelper.objectToQueryParams(discharge);
        return this.httpService.get(this.url + '/v1/discharge' + queryParams).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }

    onFindOne(uuid: string): Observable<any> {
        return this.httpService.get(this.url + '/v1/discharge/' + uuid).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }

    onUpdate(uuid: string, data: CreateDischargeInterface) {
        return this.httpService.patch(this.url + '/v1/discharge/' + uuid, data).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }
}
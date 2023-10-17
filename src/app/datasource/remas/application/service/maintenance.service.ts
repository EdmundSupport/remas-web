import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { CreateMaintenanceInterface } from "../../../../module/billing/maintenance/domain/interface/create-maintenance.interface";
import { SerializeHelper } from "src/app/shared/serialize/application/helper/serialize.helper";
import { MaintenanceInterface } from "src/app/datasource/remas/domain/interface/maintenance.interface";
import { FindMaintenanceInterface } from "../../../../module/billing/maintenance/domain/interface/find-maintenance.interface";

@Injectable({
    providedIn: 'root',
})
export class MaintenanceService {
    url = environment.apiAuth;

    constructor(
        private httpService: HttpClient,
    ) { }

    onCreate(data: CreateMaintenanceInterface) {
        return this.httpService.post(this.url + '/v1/maintenance', data).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }

    onFind(maintenance: Partial<FindMaintenanceInterface>): Observable<any> {
        const queryParams = SerializeHelper.objectToQueryParams(maintenance);
        return this.httpService.get(this.url + '/v1/maintenance' + queryParams).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            map((result: any) => {
                if (result?.statusCode && result?.statusCode != 200) {
                    return result;
                }

                return result?.data;
            }),
        );
    }

    onFindOne(uuid: string): Observable<any> {
        return this.httpService.get(this.url + '/v1/maintenance/' + uuid).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            map((result: any) => {
                if (result?.statusCode != 200) {
                    return result;
                }

                return result?.data;
            }),
        );
    }

    onUpdate(uuid: string, data: CreateMaintenanceInterface) {
        return this.httpService.patch(this.url + '/v1/maintenance/' + uuid, data).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { SerializeHelper } from "src/app/shared/serialize/application/helper/serialize.helper";
import { MeasureUnitInterface } from "../../domain/interface/measure-unit.interface";

@Injectable({
    providedIn: 'root',
})
export class MeasureUnitService {
    url = environment.remas;
    onFind$ = new BehaviorSubject<boolean>(false);

    constructor(
        private httpService: HttpClient,
    ) { }

    onFind(measureUnit: Partial<MeasureUnitInterface> = { pagination: { offset: 0, limit: 100 } }): Observable<any> {
        this.onFind$.next(true);
        const queryParams = SerializeHelper.objectToQueryParams(measureUnit);
        return this.httpService.get(this.url + '/v1/measure-unit' + queryParams).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            map((result: any) => {
                if (result?.statusCode != 200) {
                    return [];
                }
                return result?.data;
            }),
            finalize(() => {
                this.onFind$.next(false);
            })
        );
    }
}
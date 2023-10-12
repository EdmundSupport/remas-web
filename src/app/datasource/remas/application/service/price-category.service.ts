import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { SerializeHelper } from "src/app/shared/serialize/application/helper/serialize.helper";
import { PriceCategoryInterface } from "../../domain/interface/price-category.interface";

@Injectable({
    providedIn: 'root',
})
export class PriceCategoryService {
    url = environment.remas;
    onFind$ = new BehaviorSubject<boolean>(false);

    constructor(
        private httpService: HttpClient,
    ) { }

    onFind(measureUnit: Partial<PriceCategoryInterface> = { pagination: { offset: 0, limit: 100 } }): Observable<any> {
        this.onFind$.next(true);
        const queryParams = SerializeHelper.objectToQueryParams(measureUnit);
        return this.httpService.get(this.url + '/v1/price-category' + queryParams).pipe(
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
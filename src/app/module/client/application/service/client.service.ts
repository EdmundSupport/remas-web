import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SerializeHelper } from "src/app/shared/serialize/application/helper/serialize.helper";

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    url = environment.remas;
    onFindLoad$ = new BehaviorSubject<boolean>(false);

    constructor(
        private httpService: HttpClient,
    ) { }

    onFind(filter: { uuid?: string | string[], tributes: { companies: { name?: string | string[] } } }, options?: { omitLoading?: boolean }): Observable<any> {
        if (!options?.omitLoading) this.onFindLoad$.next(true);
        return this.httpService.get(this.url + '/v1/client' + SerializeHelper.objectToQueryParams(filter)).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            finalize(() => {
                if (!options?.omitLoading) this.onFindLoad$.next(false);
            })
        );
    }
}
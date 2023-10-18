import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { SerializeHelper } from "src/app/shared/serialize/application/helper/serialize.helper";
import { ModuleInterface } from "../../domain/interface/module.interface";

@Injectable({
    providedIn: 'root',
})
export class ModuleService {
    url = environment.remas;
    onFind$ = new BehaviorSubject<boolean>(false);

    constructor(
        private httpService: HttpClient,
    ) { }

    onFind(module: Partial<ModuleInterface> = { pagination: { offset: 0, limit: 100 } }): Observable<any> {
        this.onFind$.next(true);
        const queryParams = SerializeHelper.objectToQueryParams(module);
        return this.httpService.get(this.url + '/v1/module' + queryParams).pipe(
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
    
    onFindOne(uuid: string): Observable<any> {
        return this.httpService.get(this.url + '/v1/module/' + uuid).pipe(
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
}
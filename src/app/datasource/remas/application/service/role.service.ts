import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { SerializeHelper } from "src/app/shared/serialize/application/helper/serialize.helper";
import { RoleInterface } from "../../domain/interface/role.interface";
import { CreateRoleInterface } from "src/app/module/authz/role/domain/interface/create-role.interface";

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    url = environment.remas;
    onFind$ = new BehaviorSubject<boolean>(false);

    constructor(
        private httpService: HttpClient,
    ) { }

    onCreate(role: CreateRoleInterface): Observable<any> {
        return this.httpService.post(this.url + '/v1/role', role).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            map((result: any) => {
                if (result?.statusCode != 201) {
                    return [];
                }
                return result?.data;
            }),
        );
    }

    onFind(role: Partial<RoleInterface> = { pagination: { offset: 0, limit: 100 } }): Observable<any> {
        this.onFind$.next(true);
        const queryParams = SerializeHelper.objectToQueryParams(role);
        return this.httpService.get(this.url + '/v1/role' + queryParams).pipe(
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
        return this.httpService.get(this.url + '/v1/role/' + uuid).pipe(
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

    onUpdate(uuid: string, role: CreateRoleInterface): Observable<any> {
        return this.httpService.patch(this.url + '/v1/role/' + uuid, role).pipe(
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
        );
    }
}
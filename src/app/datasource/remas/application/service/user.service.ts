import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { SerializeHelper } from "src/app/shared/serialize/application/helper/serialize.helper";
import { UserInterface } from "../../domain/interface/user.interface";
import { CreateUserInterface } from "src/app/module/authz/user/domain/interface/create-user.interface";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    url = environment.remas;
    onFind$ = new BehaviorSubject<boolean>(false);

    constructor(
        private httpService: HttpClient,
    ) { }

    onCreate(user: CreateUserInterface): Observable<any> {
        return this.httpService.post(this.url + '/v1/user', user).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            map((result: any) => {
                if (result?.statusCode && result?.statusCode != 201) {
                    return [];
                }
                return result?.data;
            })
        );
    }

    onFind(user: Partial<UserInterface> = { pagination: { offset: 0, limit: 100 } }): Observable<any> {
        this.onFind$.next(true);
        const queryParams = SerializeHelper.objectToQueryParams(user);
        return this.httpService.get(this.url + '/v1/user' + queryParams).pipe(
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
        return this.httpService.get(this.url + '/v1/user/' + uuid).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            map((result: any) => {
                if (result?.statusCode && result?.statusCode != 200) {
                    return [];
                }
                return result?.data;
            })
        );
    }

    onUpdate(uuid: string, user: Partial<UserInterface>): Observable<any> {
        return this.httpService.patch(this.url + '/v1/user/' + uuid, user).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            map((result: any) => {
                if (result?.statusCode && result?.statusCode != 200) {
                    return [];
                }
                return result?.data;
            })
        );
    }
}
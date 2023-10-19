import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from "ngx-cookie-service";
import { TokenHelper } from "../helper/token.helper";
import { Router } from "@angular/router";
import { ProductInterface } from "../../domain/interface/product.interface";
import { PaginationInterface } from "src/app/module/billing/quotation/domain/interface/quotation.interface";
import { SerializeHelper } from "src/app/shared/serialize/application/helper/serialize.helper";

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    url = environment.remas;
    onFind$ = new BehaviorSubject<boolean>(false);

    constructor(
        private httpService: HttpClient,
    ) { }

    onFind(product: Partial<ProductInterface> = { pagination: { offset: 0, limit: 100 } }): Observable<any> {
        this.onFind$.next(true);
        const queryParams = SerializeHelper.objectToQueryParams(product);
        return this.httpService.get(this.url + '/v1/product' + queryParams).pipe(
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
        return this.httpService.get(this.url + '/v1/product/' + uuid).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            })),
            map((result: any) => {
                if (result?.statusCode != 200) {
                    return result;
                }
                return result?.data;
            })
        );
    }
}
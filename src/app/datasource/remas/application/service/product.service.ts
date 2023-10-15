import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { CreateProductInterface } from "../../../../module/inventory/product/domain/interface/create-product.interface";
import { SerializeHelper } from "src/app/shared/serialize/application/helper/serialize.helper";
import { ProductInterface } from "src/app/datasource/remas/domain/interface/product.interface";
import { FindProductInterface } from "../../../../module/inventory/product/domain/interface/find-product.interface";

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    url = environment.apiAuth;

    constructor(
        private httpService: HttpClient,
    ) { }

    onCreate(data: CreateProductInterface) {
        return this.httpService.post(this.url + '/v1/product', data).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }

    onFind(product: Partial<FindProductInterface>): Observable<any> {
        const queryParams = SerializeHelper.objectToQueryParams(product);
        return this.httpService.get(this.url + '/v1/product' + queryParams).pipe(
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

    onFindOne(uuid: string): Observable<any> {
        return this.httpService.get(this.url + '/v1/product/' + uuid).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }

    onUpdate(uuid: string, data: CreateProductInterface) {
        return this.httpService.patch(this.url + '/v1/product/' + uuid, data).pipe(
            catchError((result) => new Observable(observer => {
                observer.next(result?.error);
                observer.complete();
            }))
        );
    }
}
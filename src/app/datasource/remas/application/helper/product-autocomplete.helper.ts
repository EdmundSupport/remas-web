import { Injectable } from "@angular/core";
import { finalize, map } from 'rxjs/operators';
import { ProductService } from "../service/inventory-product.service";
import { ProductInterface } from "../../domain/interface/product.interface";
import { BehaviorSubject } from "rxjs";

// type Service = ProductService;
@Injectable({
    providedIn: 'root',
})
export class ProductAutocompleteHelper {
    onChange!: (object: ProductInterface) => void;
    onChanges!: (object: ProductInterface[]) => void;
    timer: any;
    onFindInitial$ = new BehaviorSubject<boolean>(false);
    constructor(
        private productService: ProductService,
    ) {
        // this.onLoad(undefined, true);
    }

    onSelected(object?: ProductInterface) {
        if (!!this.onChange) this.onChange(object!);
    }

    onOptionShow(object: ProductInterface) {
        return object?.name;
    }

    onLoad(name: string | undefined, spinner = false) {
        const payload = { name, pagination: spinner ? { offset: 0, limit: 100 } : { ofsset: 0, limit: 5 } };
        if (spinner) this.onFindInitial$.next(true);
        this.productService.onFind(payload).pipe(
            finalize(() => spinner ? this.onFindInitial$.next(false) : undefined))
            .subscribe((data) => {
                if (!!this.onChanges) this.onChanges(data)
            });
    }
}
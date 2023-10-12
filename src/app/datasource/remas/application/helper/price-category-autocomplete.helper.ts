import { Injectable } from "@angular/core";
import { finalize, map } from 'rxjs/operators';
import { PriceCategoryInterface } from "../../domain/interface/price-category.interface";
import { BehaviorSubject } from "rxjs";
import { PriceCategoryService } from "../service/price-category.service";

// type Service = PriceCategoryService;
@Injectable({
    providedIn: 'root',
})
export class PriceCategoryAutocompleteHelper {
    onChange!: (object: PriceCategoryInterface) => void;
    onChanges!: (object: PriceCategoryInterface[]) => void;
    timer: any;
    onFindInitial$ = new BehaviorSubject<boolean>(false);
    constructor(
        private measureUnitService: PriceCategoryService,
    ) { }

    onSelected(object?: PriceCategoryInterface) {
        if (!!this.onChange) this.onChange(object!);
    }

    onOptionShow(object: PriceCategoryInterface) {
        return object?.name;
    }

    onOptionSelected(object: PriceCategoryInterface) {
        if(object?.productPrices && object?.productPrices[0]) return object.productPrices[0].amount;
        return '0.00';
    }

    onLoad(filter: PriceCategoryInterface, spinner = false) {
        console.log("🚀 ~ file: price-category-autocomplete.helper.ts:29 ~ PriceCategoryAutocompleteHelper ~ onLoad ~ filter:", filter)
        const payload = { ...filter, pagination: spinner ? { offset: 0, limit: 100 } : { ofsset: 0, limit: 5 } };
        if (spinner) this.onFindInitial$.next(true);
        this.measureUnitService.onFind(payload).pipe(
            finalize(() => spinner ? this.onFindInitial$.next(false) : undefined))
            .subscribe((data) => {
                if (!!this.onChanges) this.onChanges(data)
            });
    }
}
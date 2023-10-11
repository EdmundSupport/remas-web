import { Injectable } from "@angular/core";
import { finalize, map } from 'rxjs/operators';
import { MeasureUnitInterface } from "../../domain/interface/measure-unit.interface";
import { BehaviorSubject } from "rxjs";
import { MeasureUnitService } from "../service/measure-unit.service";

// type Service = MeasureUnitService;
@Injectable({
    providedIn: 'root',
})
export class MeasureUnitAutocompleteHelper {
    onChange!: (object: MeasureUnitInterface) => void;
    onChanges!: (object: MeasureUnitInterface[]) => void;
    timer: any;
    onFindInitial$ = new BehaviorSubject<boolean>(false);
    constructor(
        private measureUnitService: MeasureUnitService,
    ) { }

    onSelected(object?: MeasureUnitInterface) {
        if (!!this.onChange) this.onChange(object!);
    }

    onOptionShow(object: MeasureUnitInterface) {
        return object?.name;
    }

    onLoad(name: string | undefined, spinner = false) {
        const payload = { name, pagination: spinner ? { offset: 0, limit: 100 } : { ofsset: 0, limit: 5 } };
        if (spinner) this.onFindInitial$.next(true);
        this.measureUnitService.onFind(payload).pipe(
            finalize(() => spinner ? this.onFindInitial$.next(false) : undefined))
            .subscribe((data) => {
                if (!!this.onChanges) this.onChanges(data)
            });
    }
}
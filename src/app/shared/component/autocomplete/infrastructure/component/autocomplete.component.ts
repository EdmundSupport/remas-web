import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";

import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Observable, catchError, finalize, map, startWith, switchMap } from "rxjs";

type OnDatasourceInterface<T> = (arg: string) => Observable<Array<T>> | Array<T>;

@Component({
    selector: 'app-autocomplete',
    templateUrl: '../page/autocomplete.page.html',
    styleUrls: ['../style/autocomplete.style.scss']
})
export class AutocompleteComponent<T>{
    @Input('width') width!: string;
    @Input('placeholder') placeholder: string = '';
    @Input('initial') initial!: T;
    @Input('value') value!: T;
    @Input('datasource') datasource: T[] = [];
    @Output('onChange') onChange = new EventEmitter<string>();
    @Output('onSelected') onSelected = new EventEmitter<T>();
    @Input('onOptionShow') onOptionShow: (arg: T) => string = (() => '');
    form = new FormControl();
    timer: any;
    constructor() {
        console.log("🚀 ~ file: autocomplete.component.ts:25 ~ AutocompleteComponent<T> ~ constructor ~ constructor:")
        this.onLoadDatasource();
    }

    ngOnInit() {
        console.log("🚀 ~ file: autocomplete.component.ts:29 ~ AutocompleteComponent<T> ~ ngOnInit ~ ngOnInit:")


        console.log(this.placeholder, "🚀 ~ file: autocomplete.component.ts:31 ~ AutocompleteComponent<T> ~ ngOnInit ~ this.initial:", this.initial)
        this.form.setValue(this.onOptionShow(this.initial));
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log("🚀 ~ file: autocomplete.component.ts:37 ~ AutocompleteComponent<T> ~ ngOnChanges ~ changes:", changes)
        // if(!changes["initial"].previousValue && changes["initial"].currentValue) this.onLoadDatasource();
    }

    onClickOption(obj: T) {
        console.log(this.placeholder, "🚀 ~ file: autocomplete.component.ts:35 ~ AutocompleteComponent<T> ~ onClickOption ~ obj:", obj)
        this.onSelected.emit(obj);
    }

    onLoadDatasource() {
        this.form.valueChanges.pipe(
            startWith(this.onOptionShow(this.initial)),
            map((value) => {
                console.log(this.placeholder, "🚀 ~ file: autocomplete.component.ts:43 ~ AutocompleteComponent<T> ~ map ~ value:", value)
                return value;
            })).subscribe((value) => {
                if (this.timer) clearTimeout(this.timer);

                this.timer = setTimeout(() => {
                    console.log(this.placeholder, "🚀 ~ file: autocomplete.component.ts:45 ~ AutocompleteComponent<T> ~ map ~ value:", value)
                    if (value) this.onChange.emit(value);
                }, 500);
            });
    }
}
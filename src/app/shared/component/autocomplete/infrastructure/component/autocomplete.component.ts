import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";

import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Observable, Subject, catchError, finalize, map, startWith, switchMap } from "rxjs";

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
    @Output('onChangeValue') onChangeValue = new EventEmitter<string>();
    @Input('datasource') datasource: T[] = [];
    @Output('onChange') onChange = new EventEmitter<string>();
    @Output('onSelected') onSelected = new EventEmitter<T>();
    @Input('onOptionShow') onOptionShow: (arg: T) => string = (() => '');
    @Input('onOptionSelected') onOptionSelected!: (arg: T) => string;
    @Input('form') form = new FormControl();
    objSelected!: T | undefined;
    value!: string;
    
    timer: any;
    constructor() {
        if(!this.onOptionSelected) this.onOptionSelected = this.onOptionShow;

    }

    ngOnInit() {
        this.onLoadDatasource();
        console.log("🚀 ~ file: autocomplete.component.ts:35 ~ AutocompleteComponent<T> ~ ngOnInit ~ this.initial:", this.initial)
        this.form.setValue(this.initial);
    }

    onClickOption(obj: T) {
        this.onSelected.emit(obj);
    }

    onLoadDatasource() {
        this.form.valueChanges.pipe(
            startWith(this.initial),
            map((value) => {
                return value;
            })).subscribe((value) => {
                console.log("🚀 ~ file: autocomplete.component.ts:45 ~ AutocompleteComponent<T> ~ map ~ value:", value)
                this.onChangeValue.emit(value);
                if (this.timer) clearTimeout(this.timer);

                this.timer = setTimeout(() => {
                    if (value) this.onChange.emit(value);
                }, 500);
            });
    }
}
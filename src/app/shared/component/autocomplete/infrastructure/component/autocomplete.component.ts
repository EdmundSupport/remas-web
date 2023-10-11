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
    @Input('value') value!: T;
    @Input('datasource') datasource: T[] = [];
    @Output('onChange') onChange = new EventEmitter<string>();
    @Output('onSelected') onSelected = new EventEmitter<T>();
    @Input('onOptionShow') onOptionShow: (arg: T) => string = (() => '');
    objSelected!: T | undefined;
    form = new FormControl();
    timer: any;
    constructor() {
        this.onLoadDatasource();
    }

    ngOnInit() {
        this.form.setValue(this.onOptionShow(this.initial));
    }

    onClickOption(obj: T) {
        this.onSelected.emit(obj);
    }

    onLoadDatasource() {
        this.form.valueChanges.pipe(
            startWith(this.onOptionShow(this.initial)),
            map((value) => {
                return value;
            })).subscribe((value) => {
                if (this.timer) clearTimeout(this.timer);

                this.timer = setTimeout(() => {
                    if (value) this.onChange.emit(value);
                }, 500);
            });
    }
}
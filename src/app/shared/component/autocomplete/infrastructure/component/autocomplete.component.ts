import { Component, EventEmitter, Input, Output } from "@angular/core";

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
    @Input('datasource') datasource: T[] = [];
    @Output('onChange') onChange = new EventEmitter<string>();
    @Output('onSelected') onSelected = new EventEmitter<T>();
    @Input('onOptionShow') onOptionShow: (arg: T) => string = (() => '');
    form = new FormControl();

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
                this.onChange.emit(value);
            });
    }
}
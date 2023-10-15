import {
    Component, ElementRef,
} from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';
import { MeasureInterface } from 'src/app/datasource/remas/domain/interface/measure.interface';
import { MeasureService } from 'src/app/datasource/remas/application/service/measure.service';

@Component({
    selector: 'app-product-form',
    templateUrl: '../page/product-form.page.html',
    styleUrls: ['../style/product-form.style.scss'],
})
export class ProductFormComponent {
    
    product: Partial<ProductInterface> = {
        uuid: '',
        sku: '',
        name: '',
        description: '',
        // parentUuid: '', // TODO corregir porque no es funcional este campo
        measureUuid: '',
        productTypeUuid: '',
        productPrices: [],
        productMaintenanceSteps: [],
    };
    
    total!: number;

    onSaveLoading$ = new BehaviorSubject<boolean>(false);
    timeSaveLoading: any;

    measure!: MeasureInterface;
    measures: MeasureInterface[] = [];
    measureTimer: any;

    constructor(
        private matSnackBar: MatSnackBar,
        private elementRef: ElementRef,
        private router: Router,
        private route: ActivatedRoute,
        private measureService: MeasureService
    ) {
    }

    ngOnInit() {
    }

     // region Autocomplete Measure
     onChangeMeasure(textMeasure: string) {
        if (this.measureTimer) clearTimeout(this.measureTimer);

        this.measureTimer = setTimeout(() => {
            if (textMeasure) {
                this.onLoadMeasure({ name: textMeasure });
            }
        }, 400);
    }

    onSelectMeasure(measure: MeasureInterface) {
        this.measure = measure;
        this.product.measureUuid = this.measure.uuid;
    }

    onLoadMeasure(filter: Partial<MeasureInterface>) {
        const payload = { pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.measureService.onFind(payload)
            .subscribe((data) => this.measures = data);
    }

    onShowMeasure(measure: MeasureInterface) {
        return measure?.name ?? '';
    }
    // endregion Autocomplete Measure
}

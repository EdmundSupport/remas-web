import {
    Component, ElementRef, EventEmitter, Input, Output, Renderer2,
} from '@angular/core';
import { MaintenanceStepDetailInterface } from 'src/app/datasource/remas/domain/interface/maintenance-step-detail.interface';
import { MaintenanceService } from '../../../../../datasource/remas/application/service/maintenance.service';
import { MaintenanceInterface } from 'src/app/datasource/remas/domain/interface/maintenance.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MeasureUnitInterface } from 'src/app/datasource/remas/domain/interface/measure-unit.interface';
import { MeasureUnitService } from 'src/app/datasource/remas/application/service/measure-unit.service';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';
import { ProductService } from 'src/app/datasource/remas/application/service/product.service';
import { ProductMaintenanceStepDetailInterface } from 'src/app/datasource/remas/domain/interface/product-maintenance-step-detail.interface';

@Component({
    selector: 'app-maintenance-step-detail-multiple',
    templateUrl: '../page/maintenance-step-detail-multiple.page.html',
    // styleUrls: ['../style/maintenance-step-detail-multiple.style.scss'],
})
export class MaintenanceStepDetailMultipleComponent {
    @Output('onDelete') onDelete = new EventEmitter();
    @Output('onChange') onChange = new EventEmitter();
    @Output('onLoad') onLoad = new EventEmitter();
    @Input('measureUuid') measureUuid!: string | undefined;
    @Input('maintenanceStepUuid') maintenanceStepUuid!: string  | undefined;
    @Input('detail') detail!: Partial<MaintenanceStepDetailInterface>;

    product!: ProductInterface;
    products: ProductInterface[] = [];
    productTimer: any;

    measureUnit!: MeasureUnitInterface;
    measuresUnit: MeasureUnitInterface[] = [];
    measureUnitTimer: any;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private matSnackBar: MatSnackBar,
        private productService: ProductService,
        private measureUnitService: MeasureUnitService,
    ) {

    }

    ngOnInit() {
        if (this.detail) {
            if (this.detail.measureUnitUuid) this.onLoadMeasureUnit({ uuid: this.detail.measureUnitUuid }).add(() => {
                this.measureUnit = this.measuresUnit.find((measureUnit) => measureUnit.uuid == this.detail.measureUnitUuid)!;
            })
        }
    }

    delete() {
        if (this.onDelete) this.onDelete.emit(this.detail);
    }

    ngAfterViewInit() {
        // this.onLoad.emit();
    }

    ngOnChanges() {
        this.onChange.emit(this.detail);
    }

    // region Autocomplete MeasureUnit
    onChangeMeasureUnit(textMeasureUnit: string) {
        if (this.measureUnitTimer) clearTimeout(this.measureUnitTimer);

        this.measureUnitTimer = setTimeout(() => {
            if (textMeasureUnit) {
                this.onLoadMeasureUnit({ name: textMeasureUnit });
            }
        }, 400);
    }

    onSelectMeasureUnit(measureUnit: MeasureUnitInterface) {
        this.measureUnit = measureUnit;
        this.detail.measureUnitUuid = this.measureUnit.uuid;
        this.ngOnChanges();
    }

    onLoadMeasureUnit(filter: Partial<MeasureUnitInterface>) {
        const payload = { measureUuid: this.measureUuid, pagination: { offset: 0, limit: 5 } };
        Object.assign(payload, filter);
        return this.measureUnitService.onFind(payload)
            .subscribe((result) => {
                if (result?.statusCode && result?.statusCode != 200) {
                    this.matSnackBar.open(result?.message ?? 'Ocurrio un error al cargar los measureUnitos.');
                    return;
                }
                this.measuresUnit = result;
            });
    }

    onShowMeasureUnit(measureUnit: MeasureUnitInterface) {
        return measureUnit?.name ?? '';
    }
    // endregion Autocomplete MeasureUnit
}

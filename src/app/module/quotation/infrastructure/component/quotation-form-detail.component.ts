import {
    Component,
} from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { colors } from 'src/app/shared/color/domain/constant/color.constant';
import { QuotationService } from '../../application/service/quotation.service';
import { QuotationCreateInterface } from '../../domain/interface/quotation.interface';
import { ClientService } from 'src/app/module/client/application/service/client.service';
import { finalize, map } from 'rxjs';
import { ClientInterface } from 'src/app/datasource/remas/domain/interface/client.interface';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';
import { ProductAutocompleteHelper } from 'src/app/datasource/remas/application/helper/product-autocomplete.helper';

@Component({
    selector: 'app-quotation-form-detail',
    templateUrl: '../page/quotation-form-detail.page.html',
    styleUrls: ['../style/quotation-form-detail.style.scss'],
})
export class QuotationFormDetailComponent {
    products: ProductInterface[] = [];
    product!: ProductInterface;


    constructor(
        protected productAutompleteHelper: ProductAutocompleteHelper,
    ) {
        this.productAutompleteHelper.onChange = (product: ProductInterface) => this.product = product;
        this.productAutompleteHelper.onChanges = (products: ProductInterface[]) => this.products = products;
    }

    ngOnInit() {
        // this.productAutompleteHelper.onLoad(undefined, true);
    }

    onImporteSum() {
        return 9999999.99;
    }

    onLogIn() {
    }
}

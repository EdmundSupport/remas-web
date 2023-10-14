import {
    Component,
} from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { parseISO } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { colors } from 'src/app/shared/color/domain/constant/color.constant';
import { ProductService } from '../../application/service/product.service';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { increment } from 'src/app/shared/component/tool_bar/application/action/tool_bar.action';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product',
    templateUrl: '../page/product.page.html',
    styleUrls: ['../style/product.style.scss'],
})
export class ProductComponent {
    events: CalendarEvent[] = [];

    products: ProductInterface[] = [];
    count$!: Observable<number>;
    constructor(
        private productService: ProductService,
        private matSnackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<{ count: number }>,
    ) { 
        this.count$ = store.select('count');
    }
}

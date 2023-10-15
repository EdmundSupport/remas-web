import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductInterface } from 'src/app/datasource/remas/domain/interface/product.interface';
import { ProductService } from 'src/app/datasource/remas/application/service/inventory-product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription } from 'rxjs';

type DisplayColumnsInterface = keyof ProductInterface | 'action';
@Component({
    selector: 'app-product',
    templateUrl: '../page/product.page.html',
    styleUrls: ['../style/product.style.scss'],
})
export class ProductComponent implements AfterViewInit {
    displayedColumns: DisplayColumnsInterface[] = ['sku', 'name', 'action'];
    dataSource!: MatTableDataSource<ProductInterface>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    onLoading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private productService: ProductService,
        private matSnackBar: MatSnackBar,
    ) {
        // Create 100 users
        // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

        // Assign the data to the data source for the table to render
        // this.dataSource = new MatTableDataSource(users);
    }

    ngOnInit() {
        this.onLoadProducts({
            pagination: { limit: 5, offset: 0 }
        } as any);
    }

    ngAfterViewInit() {
        if (this.dataSource?.paginator) this.dataSource.paginator = this.paginator;
        if (this.dataSource?.sort) this.dataSource.sort = this.sort;
    }

    onEdit(product: ProductInterface) {

    }

    onDelete(product: ProductInterface) {

    }

    onLoad() {
    }

    onLoadProducts(filter: Partial<ProductInterface>) {
        return this.productService.onFind(filter).subscribe((result) => {
            const newData: ProductInterface[] = [...this.dataSource?.data ?? [], ...result];
            newData.map((item, index, array) => {
                const arrayIndex = array.findIndex((arrayItem) => arrayItem.uuid == item.uuid);
                if (arrayIndex == -1)
                    array.splice(arrayIndex, 1);

                return item;
            });

            this.dataSource = new MatTableDataSource(newData);
        });
    }

    async applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        const filter = filterValue.trim().toLowerCase();
        if (this.dataSource) {
            this.dataSource.filter = filter;

            if (this.dataSource.filteredData.length == 0)
                for (let index = 0; index < this.displayedColumns.length; index++) {
                    const value = this.displayedColumns[index];
                    if (this.dataSource.filteredData.length > 0) return;

                    const payload: Partial<ProductInterface> = { pagination: { offset: 0, limit: 5 } };
                    if (value == 'sku') payload.sku = filter;
                    if (value == 'name') payload.name = filter;

                    if (value != 'action') {
                        await (new Promise((resolve) => {
                            this.onLoadProducts(payload).add(() => {
                                this.dataSource.filter = filter;
                                resolve(null);
                            });
                        }))
                    }
                }

            if (this.dataSource.paginator) {
                this.dataSource.paginator.firstPage();
            }
        }
    }
}
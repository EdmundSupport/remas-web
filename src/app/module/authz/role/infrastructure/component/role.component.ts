import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RoleInterface } from 'src/app/datasource/remas/domain/interface/role.interface';
import { RoleService } from 'src/app/datasource/remas/application/service/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

type DisplayColumnsInterface = keyof RoleInterface | 'action';
@Component({
    selector: 'app-role',
    templateUrl: '../page/role.page.html',
    styleUrls: ['../style/role.style.scss'],
})
export class RoleComponent implements AfterViewInit {
    displayedColumns: DisplayColumnsInterface[] = ['keyName', 'name', 'condition', 'action'];
    dataSource!: MatTableDataSource<RoleInterface>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    onLoading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private roleService: RoleService,
        private matSnackBar: MatSnackBar,
        private router: Router,
    ) {
        // Create 100 users
        // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

        // Assign the data to the data source for the table to render
        // this.dataSource = new MatTableDataSource(users);
    }

    ngOnInit() {
        this.onLoadRoles({
            pagination: { limit: 5, offset: 0 }
        } as any);
    }

    ngAfterViewInit() {
        if (this.dataSource?.paginator) this.dataSource.paginator = this.paginator;
        if (this.dataSource?.sort) this.dataSource.sort = this.sort;
    }

    onAdd(){
        this.router.navigate(['/app/authz/new']);
    }

    onEdit(role: RoleInterface) {
        this.router.navigate(['/app/authz/'+role.uuid]);
    }

    onDelete(role: RoleInterface) {

    }

    onLoad() {
    }

    onLoadRoles(filter: Partial<RoleInterface>) {
        return this.roleService.onFind(filter).subscribe((result) => {
            if (result?.statusCode && result?.statusCode != 200) {
                this.matSnackBar.open(result?.message ?? 'Ocurrio un error al filtrar el servidor.');
                return;
            }
            const newData: RoleInterface[] = [...this.dataSource?.data ?? [], ...result];
            newData.map((item, index, array) => {
                const arrayIndex = array.findIndex((arrayItem) => arrayItem.uuid == item.uuid);
                if (arrayIndex != -1 && index != arrayIndex)
                    array.splice(arrayIndex, 1);

                return item;
            });

            this.dataSource = new MatTableDataSource(newData);
        });
    }

    async applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        const filter = filterValue.trim();
        if (this.dataSource) {
            this.dataSource.filter = filter;

            if (this.dataSource.filteredData.length == 0)
                for (let index = 0; index < this.displayedColumns.length; index++) {
                    const value = this.displayedColumns[index];
                    if (this.dataSource.filteredData.length > 0) return;

                    const payload: Partial<RoleInterface> = { pagination: { offset: 0, limit: 5 } };
                    if (value == 'keyName') payload.keyName = filter;
                    if (value == 'name') payload.name = filter;
                    if (value == 'condition') payload.condition = Boolean(filter);

                    if (value != 'action') {
                        await (new Promise((resolve) => {
                            this.onLoadRoles(payload).add(() => {
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
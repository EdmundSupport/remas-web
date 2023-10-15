// import { ProductFormComponent } from "./infrastructure/component/product-form.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from "@angular/core";
import { ProductComponent } from "./infrastructure/component/product.component";
// import { ProductFormDetailComponent } from "./infrastructure/component/product-form-detail.component";
import { ProductRoutingModule } from "./product-routing.module";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
@NgModule({
    declarations: [
        ProductComponent,
        // ProductFormComponent,
        // ProductFormDetailComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatSnackBarModule,
        ProductRoutingModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule
    ]
})
export class ProductModule { }
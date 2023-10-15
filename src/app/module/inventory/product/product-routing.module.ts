import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductComponent } from "./infrastructure/component/product.component";
import { AuthGuard } from "src/app/shared/auth/infrastructure/guard/auth.guard";
import { ProductFormComponent } from "./infrastructure/component/product-form.component";

const routes: Routes = [
    { path: '', component: ProductComponent, canActivate: [AuthGuard] },
    { path: ':uuid', component: ProductFormComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class ProductRoutingModule { }
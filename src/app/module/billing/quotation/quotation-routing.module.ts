import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuotationComponent } from "./infrastructure/component/quotation.component";
import { AuthGuard } from "src/app/shared/auth/infrastructure/guard/auth.guard";
import { QuotationFormComponent } from "./infrastructure/component/quotation-form.component";

const routes: Routes = [
    { path: '', component: QuotationComponent, canActivate: [AuthGuard] },
    { path: ':uuid', component: QuotationFormComponent, canActivate: [AuthGuard] },
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
export class QuotationRoutingModule { }
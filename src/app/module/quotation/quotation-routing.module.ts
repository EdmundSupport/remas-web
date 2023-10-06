import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuotationComponent } from "./infrastructure/component/quotation.component";
import { AuthGuard } from "src/app/shared/auth/infrastructure/guard/auth.guard";

const routes: Routes = [
    { path: '', component: QuotationComponent, canActivate: [AuthGuard] },
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
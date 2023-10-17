import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChargeComponent } from "./infrastructure/component/charge.component";
import { AuthGuard } from "src/app/shared/auth/infrastructure/guard/auth.guard";
import { ChargeFormComponent } from "./infrastructure/component/charge-form.component";

const routes: Routes = [
    { path: '', component: ChargeComponent, canActivate: [AuthGuard] },
    { path: ':uuid', component: ChargeFormComponent, canActivate: [AuthGuard] },
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
export class ChargeRoutingModule { }
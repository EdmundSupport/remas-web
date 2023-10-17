import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DischargeComponent } from "./infrastructure/component/discharge.component";
import { AuthGuard } from "src/app/shared/auth/infrastructure/guard/auth.guard";
import { DischargeFormComponent } from "./infrastructure/component/discharge-form.component";

const routes: Routes = [
    { path: '', component: DischargeComponent, canActivate: [AuthGuard] },
    { path: ':uuid', component: DischargeFormComponent, canActivate: [AuthGuard] },
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
export class DischargeRoutingModule { }
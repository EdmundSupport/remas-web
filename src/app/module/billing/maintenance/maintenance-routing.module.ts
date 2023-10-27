import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaintenanceComponent } from "./infrastructure/component/maintenance.component";
import { AuthGuard } from "src/app/shared/auth/infrastructure/guard/auth.guard";
import { MaintenanceFormComponent } from "./infrastructure/component/maintenance-form.component";

const routes: Routes = [
    { path: '', component: MaintenanceComponent, canActivate: [AuthGuard] },
    // { path: ':uuid', component: MaintenanceFormComponent, canActivate: [AuthGuard] },
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
export class MaintenanceRoutingModule { }
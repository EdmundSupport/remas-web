import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoleComponent } from "./infrastructure/component/role.component";
import { AuthGuard } from "src/app/shared/auth/infrastructure/guard/auth.guard";
import { RoleFormComponent } from "./infrastructure/component/role-form.component";

const routes: Routes = [
    { path: '', component: RoleComponent, canActivate: [AuthGuard] },
    { path: ':uuid', component: RoleFormComponent, canActivate: [AuthGuard] },
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
export class RoleRoutingModule { }
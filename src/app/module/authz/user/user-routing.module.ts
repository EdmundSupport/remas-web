import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./infrastructure/component/user.component";
import { AuthGuard } from "src/app/shared/auth/infrastructure/guard/auth.guard";
import { UserFormComponent } from "./infrastructure/component/user-form.component";

const routes: Routes = [
    { path: '', component: UserComponent, canActivate: [AuthGuard] },
    { path: ':uuid', component: UserFormComponent, canActivate: [AuthGuard] },
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
export class UserRoutingModule { }
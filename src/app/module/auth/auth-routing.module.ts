import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./infrastructure/component/auth.component";
import { AuthGuard } from "src/app/shared/auth/infrastructure/guard/auth.guard";
import { AuthSignInComponent } from "./infrastructure/component/auth-sign-in.component";

const routes: Routes = [
    { path: 'log-in', component: AuthComponent, canActivate: [AuthGuard] },
    { path: 'sign-in', component: AuthSignInComponent },
    { path: '**', redirectTo: 'log-in' },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class AuthRoutingModule { }
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./infrastructure/component/app.component";
import { AuthGuard } from "src/app/shared/auth/infrastructure/guard/auth.guard";

const routes: Routes = [
    { path: '', component: AppComponent, canActivate: [AuthGuard] },
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
export class AppRoutingModule { }
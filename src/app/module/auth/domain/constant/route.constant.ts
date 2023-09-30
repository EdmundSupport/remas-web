import { Routes } from "@angular/router";
import { AuthComponent } from "../../infrastructure/component/auth.component";

export const routeConstant: Routes = [
    { path: '**', redirectTo: ''},
    { path: '', component: AuthComponent },
    // Otras rutas de administración...
];
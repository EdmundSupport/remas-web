import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/infrastructure/guard/auth.guard';

const routes: Routes = [
  {
    path: 'app/inventory/product',
    loadChildren: () => import('./module/inventory/product/product.module').then((m) => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'app/quotation',
    loadChildren: () => import('./module/quotation/quotation.module').then((m) => m.QuotationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'app',
    loadChildren: () => import('./module/app/app.module').then((m) => m.AppModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./module/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/infrastructure/guard/auth.guard';

const routes: Routes = [
  {
    path: 'app/discharge',
    loadChildren: () => import('./module/inventory/discharge/discharge.module').then((m) => m.DischargeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'app/charge',
    loadChildren: () => import('./module/inventory/charge/charge.module').then((m) => m.ChargeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'app/inventory/product',
    loadChildren: () => import('./module/inventory/product/product.module').then((m) => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'app/maintenance',
    loadChildren: () => import('./module/billing/maintenance/maintenance.module').then((m) => m.MaintenanceModule),
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

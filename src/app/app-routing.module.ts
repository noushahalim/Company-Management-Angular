import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { featuresGuard } from './shared/guards/features.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule),
    canActivate:[authGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate:[featuresGuard]
  },
  {
    path: 'company',
    loadChildren: () => import('./features/company/company.module').then(m => m.CompanyModule),
    canActivate:[featuresGuard]
  },
  {
    path: 'employees',
    loadChildren: () => import('./features/employee/employee.module').then(m => m.EmployeeModule),
    canActivate:[featuresGuard]
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

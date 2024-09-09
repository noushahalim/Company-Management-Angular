import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { CompanyUpdateComponent } from './pages/company-update/company-update.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyDetailsComponent,
  },
  {
    path: 'updateCompany',
    component: CompanyUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}

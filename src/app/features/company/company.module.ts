import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { CompanyRoutingModule } from './company.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyUpdateComponent } from './pages/company-update/company-update.component';



@NgModule({
  declarations: [
    CompanyDetailsComponent,
    CompanyUpdateComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule
  ]
})
export class CompanyModule { }

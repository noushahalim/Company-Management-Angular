import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { CompanyRoutingModule } from './company.routes';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CompanyDetailsComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule
  ]
})
export class CompanyModule { }

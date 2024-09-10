import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeeRoutingModule } from './employee.routes';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    FormsModule
]
})
export class EmployeeModule { }

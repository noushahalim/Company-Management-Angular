import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeeRoutingModule } from './employee.routes';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './pages/update-employee/update-employee.component';



@NgModule({
  declarations: [
    EmployeesComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class EmployeeModule { }

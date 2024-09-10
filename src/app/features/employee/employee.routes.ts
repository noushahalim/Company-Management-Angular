import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './pages/update-employee/update-employee.component';
import { employeeUpdateResolver } from './resolvers/employee-update.resolver';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
  {
    path: 'createEmployee',
    component: CreateEmployeeComponent,
  },
  {
    path: 'updateEmployee/:id',
    component: UpdateEmployeeComponent,
    resolve:{employeeData:employeeUpdateResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}

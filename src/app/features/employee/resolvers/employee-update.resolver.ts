import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { catchError, of } from 'rxjs';
import { Employee } from '../models/employee.model';

export const employeeUpdateResolver: ResolveFn<Employee | null> = (route, state) => {

  const employeeService = inject(EmployeeService);
  const id = route.params['id'];

  if(!id){
    return of(null)
  }

  return employeeService.employeeDetails(id).pipe(
    catchError(error =>{
      console.error('Error retrieving employee details:', error);
      return of(null)
    })
  )
};

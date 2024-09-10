import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Employee } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  api = environment.baseUrl;
  employees! : [Employee];
  employeesCount! : number;

  loginedEmployeeDetails( ):Observable<any>{
    const loginedEmployeeDetailsApi=`${this.api}/Employee/GetLoginEmployeeDetails`
    return this.http.post(loginedEmployeeDetailsApi,null)
  }

  getAllEmployees(data:object):Observable<any>{
    const getAllEmployeesApi=`${this.api}/Employee/GetAllEmployees`
    return this.http.post(getAllEmployeesApi,data)
  }
}

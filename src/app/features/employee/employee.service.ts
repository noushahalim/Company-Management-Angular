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

  createEmployee(data: object):Observable<any>{
    const createEmployeeApi=`${this.api}/Employee/CreateEmployee`;
    return this.http.post(createEmployeeApi,data);
  }

  employeeDetails(id: any):Observable<any>{
    const employeeDetailsApi=`${this.api}/Employee/GetEmployeeById`
    return this.http.post(employeeDetailsApi,{id:id})
  }

  updateEmployee(data: object):Observable<any>{
    const updateEmployeeApi=`${this.api}/Employee/UpdateEmployee`;
    return this.http.post(updateEmployeeApi,data);
  }

  updateProfile(data:any):Observable<any>{
    const updateProfileApi=`${this.api}/Employee/UploadEmployeeProfilePhoto`
    return this.http.post(updateProfileApi,data)
  }

  removeProfile(id:any):Observable<any>{
    const removeProfileApi=`${this.api}/Employee/RemoveEmployeeProfilePhoto`
    return this.http.post(removeProfileApi,{id:id})
  }

  GetAllDepartments(data: object):Observable<any>{
    const GetAllDepartmentsApi=`${this.api}/Department/GetAllDepartments`;
    return this.http.post(GetAllDepartmentsApi,data);
  }

  GetAllDesignations(data: object):Observable<any>{
    const GetAllDesignationsApi=`${this.api}/Designation/GetAllDesignations`;
    return this.http.post(GetAllDesignationsApi,data);
  }
}

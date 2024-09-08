import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  api = environment.baseUrl;

  loginedEmployeeDetails( ):Observable<any>{
    const loginedEmployeeDetailsApi=`${this.api}/Employee/GetLoginEmployeeDetails`

    return this.http.post(loginedEmployeeDetailsApi,null)
  }
}

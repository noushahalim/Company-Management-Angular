import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "./auth.model";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http:HttpClient) {}

    api = environment.baseUrl;
    token = localStorage.getItem('token');
    companyId = localStorage.getItem('companyId');
    refreshToken = localStorage.getItem('refreshToken');
    firstName = localStorage.getItem('firstName');
    profileImage = localStorage.getItem('profileImage');

    login(data: Login):Observable<any>{
        const loginApi=`${this.api}/User/Login`
        return this.http.post(loginApi,data);
    }
    
}
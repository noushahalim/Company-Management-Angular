import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "./auth.model";
import { environment } from "src/environment/environment";
import { Router } from "@angular/router";
import { CompanyService } from "src/app/features/company/company.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private route: Router,
        private companyService: CompanyService
    ) {}

    api = environment.baseUrl;
    token = localStorage.getItem('token');
    companyId = localStorage.getItem('companyId');
    refreshToken = localStorage.getItem('refreshToken');
    firstName = localStorage.getItem('firstName');
    employeeId = localStorage.getItem('employeeId')
    profileImage = localStorage.getItem('profileImage');

    login(data: Login):Observable<any>{
        const loginApi=`${this.api}/User/Login`
        return this.http.post(loginApi,data);
    }

    validateRefreshToken(data: object):Observable<any>{
        const validateRefreshTokenApi=`${this.api}/User/ValidateRefreshToken`
        return this.http.post(validateRefreshTokenApi,data);
    }

    logout(){
        localStorage.clear()
        this.token = '';
        this.refreshToken = '';
        this.companyId = '';
        this.firstName = '';
        this.profileImage = '';
        this.employeeId = '';
        this.companyService.companyLogo = '';
        this.route.navigate(['/auth/login']);
    }
    
}
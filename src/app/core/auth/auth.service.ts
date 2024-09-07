import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { Login } from "./auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http:HttpClient) {}

    api = environment.baseUrl;

    login(data: Login):Observable<any>{
        const loginApi=`${this.api}/User/Login`

        return this.http.post(loginApi,data)
    }
    
}
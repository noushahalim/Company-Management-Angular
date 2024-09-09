import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  api = environment.baseUrl;
  companyData = this.getCompanyData();
  companyLogo = localStorage.getItem('companyLogo');

  getCompanyData(): any {
    const companyDataString = localStorage.getItem('companyData');
    if (companyDataString) {
      try {
        return JSON.parse(companyDataString);
      } catch (error) {
        console.error('Error parsing companyData from localStorage', error);
        return null;
      }
    }
    return null;
  }

  companyDetails(id: string):Observable<any>{
    const companyDetailsApi=`${this.api}/Company/GetCompanyById`;

    return this.http.post(companyDetailsApi,{id:id});
  }

  GetAllCurrency(data: object):Observable<any>{
    const GetAllCurrencyApi=`${this.api}/Company/GetAllCurrency`;

    return this.http.post(GetAllCurrencyApi,data);
  }
}

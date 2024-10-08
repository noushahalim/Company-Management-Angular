import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../company.service';
import { Company } from '../../models/company.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit{
  constructor(
    private companyService : CompanyService,
    private authService : AuthService,
    private route: Router
  ) {}

  company : Company = {
    id: '',
    name: '',
    shortName: '',
    vatNo: '',
    crNo: '',
    addressLine1: '',
    addressLine2: '',
    zipCode: '',
    emailId: '',
    phoneNo1: '',
    phoneNo2: '',
    logo: '',
    currencyId: 0,
    currency: ''
  }
  logo! : string;

  ngOnInit(): void {
    this.companyService.companyDetails(this.authService.companyId).subscribe(
      (response)=>{
        this.company = response.data;
        localStorage.setItem('companyData', JSON.stringify(response.data));

        if(this.company.logo){
          const photoName = this.company.logo;
          const token = this.authService.token;
    
          this.logo = `${environment.baseUrl}/Company/GetCompanyLogo?photoName=${photoName}&token=${token}`;
    
          localStorage.setItem('companyLogo', this.logo);
          this.companyService.companyLogo = this.logo;
        }
        
        const data = {
          "searchKeyword": "",
          "pageIndex": 0,
          "pageSize": 0
        };
    
        this.companyService.GetAllCurrency(data).subscribe(
          (response)=>{
            if (response?.data?.result) {
              const matchedCurrency = response.data.result.find(
                (currency: any) => currency.id === this.company.currencyId
              );
      
              if (matchedCurrency) {
                this.company.currency = matchedCurrency.name;
              }
            }
          },
          (error)=>{
            console.log(error);
          }
        )
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onUpdateClick() {
    this.route.navigate(['/company/updateCompany'])
  }
}

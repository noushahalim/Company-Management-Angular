import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../company.service';
import { Company } from '../../models/company.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.css']
})
export class CompanyUpdateComponent implements OnInit{
  constructor(
    private companyService : CompanyService,
    private formBuilder : FormBuilder,
    private route : Router,
    private authService : AuthService
  ) { }

  updationForm!:FormGroup;
  logoChangeForm!:FormGroup;
  logo! : string;
  companyData! : Company;
  allCurrency! : [{ id:number, name:string, symbol:string }];
  selectedCurrency! : { id:number, name:string, symbol:string }
  error : any;
  showChangeLogoModal : boolean = false;
  buttonDisabled:boolean=false
  previewImageSrc : string='';
  imageFile : any = null;

  ngOnInit(): void {
    if(this.companyService.companyLogo){
      this.logo = this.companyService.companyLogo;
    }

    this.companyData = this.companyService.getCompanyData();
    this.updationForm = this.formBuilder.group({
      id:['',[Validators.required]],
      name:['',[Validators.required]],
      shortName:['',[Validators.required]],
      contactPersonName:[''],
      addressLine1:['',[Validators.required]],
      addressLine2:['',[Validators.required]],
      zipCode:['',[Validators.required]],
      emailId:['',[Validators.required,Validators.email]],
      phoneNo1:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
      phoneNo2:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
      vatNo:['',[Validators.required]],
      crNo:['',[Validators.required]],
      currencyId:[null,[Validators.required]]
    })  

    this.updationForm.patchValue(this.companyData)

    this.logoChangeForm = this.formBuilder.group({
      image:[[],Validators.required]
    })

    const data = {
      "searchKeyword": "",
      "pageIndex": 0,
      "pageSize": 0
    };
    this.companyService.GetAllCurrency(data).subscribe(
      (response)=>{
        if (response?.data?.result) {
          this.selectedCurrency = response.data.result.find(
            (currency: any) => currency.id === this.companyData.currencyId
          );
        }
        this.allCurrency = response.data.result;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onSubmit(){
    if(this.updationForm.valid){
      this.companyService.updateCompany(this.updationForm.value).subscribe(
        (response)=>{

          this.companyService.companyDetails(this.authService.companyId).subscribe(
            (response)=>{
              localStorage.setItem('companyData', JSON.stringify(response.data));
              this.companyData = response.data;
            },
            (error)=>{
              console.log(error);
            }
          )
    
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updated",
            showConfirmButton: false,
            timer: 1500
          });

          this.route.navigate(['/company'])
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    else{
      this.error = 'please check all values'
      setTimeout(() => {
        this.error = '';
      }, 3000);
    }
  }

  openModel(){
    this.showChangeLogoModal=true
  }

  closeModal(){
    this.showChangeLogoModal=false
  }

  onImageUpload(event:any){
    this.logoChangeForm.value.image = event.target.files[0];
    this.previewImageSrc = URL.createObjectURL(event.target.files[0]);
    this.imageFile = event.target.files[0]
  }

  updateLogo(){
    if (this.logoChangeForm.valid){
      this.buttonDisabled=true;

      const data= new FormData()
      data.append('Photo',this.imageFile);
      const companyId = this.authService.companyId;
      if (companyId) {
        data.append('Id', companyId);
      } else {
        console.error('Company ID is null or undefined');
        this.buttonDisabled = false;
        return;
      }

      this.companyService.updateLogo(data).subscribe(
        (response)=>{
          this.companyService.companyDetails(this.authService.companyId).subscribe(
            (response)=>{
              localStorage.setItem('companyData', JSON.stringify(response.data));
              this.companyData = response.data;
              if(this.companyData.logo){
                const photoName = this.companyData.logo;
                const token = this.authService.token;
          
                this.logo = `${environment.baseUrl}/Company/GetCompanyLogo?photoName=${photoName}&token=${token}`;
          
                localStorage.setItem('companyLogo', this.logo);
                this.companyService.companyLogo = this.logo;
                this.showChangeLogoModal=false;
                this.buttonDisabled=false;
              }

              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Updated",
                showConfirmButton: false,
                timer: 1500
              });
            },
            (error)=>{
              console.log(error);
            }
          )
          
        },
        (error:any)=>{
          console.log(error)
          this.buttonDisabled=false
        }
      )
    }
    else {
      console.error('Form is invalid:', this.logoChangeForm.errors);
    }
  }

  deleteLogo(){
    Swal.fire({
      title: "Are you sure?",
      text: "You're Trying to Delete Logo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!"
    }).then((result) => {
      if (result.isConfirmed) {
        const companyId = this.authService.companyId;
        if (!companyId) {
          console.error('Company ID is null or undefined');
          return;
        }
        this.companyService.removeLogo(companyId).subscribe(
          (response)=>{
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Deleted",
              showConfirmButton: false,
              timer: 1500
            });
            localStorage.removeItem('companyLogo');
            this.companyService.companyLogo = '';
            this.logo = '';
          },
          (error:any)=>{
            console.log(error)
          }
        )
      }
    })
  }
}

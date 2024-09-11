import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/features/company/company.service';
import { EmployeeService } from 'src/app/features/employee/employee.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route:Router,
    private employeeService: EmployeeService
  ) { }

  loginForm!:FormGroup;
  backendError:string='';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      clientId: ['ERPWebApp', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response)=>{
          this.handleLoginResponse(response)
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }

  handleLoginResponse(response: any){
    if(response.isValid===false){
      this.backendError = response.errorMessages[0];
      setTimeout(() => {
        this.backendError = '';
      }, 3000);
    }
    else {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('companyId', response.data.companyId);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('firstName', response.data.firstName);
      localStorage.setItem('employeeId', response.data.employeeId);
      this.authService.token = response.data.token;
      this.authService.companyId = response.data.companyId;
      this.authService.refreshToken = response.data.refreshToken;
      this.authService.firstName = response.data.firstName;
      this.authService.employeeId = response.data.employeeId;

      this.employeeService.loginedEmployeeDetails().subscribe(
        (response)=>{
          if(response.data.profilePhotoName){
            const photoName = response.data.profilePhotoName;
            const token = this.authService.token;

            const profileImageUrl = `${environment.baseUrl}/Employee/GetEmployeeProfilePhoto?photoName=${photoName}&token=${token}`;

            localStorage.setItem('profileImage', profileImageUrl);
            this.authService.profileImage = profileImageUrl;
          }
        },
        (error)=>{
          console.log(error);
        }
      )

      this.route.navigate(['/company'])
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  loginForm!:FormGroup;
  backendError:string=''

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
          if(response.isValid===false){
            this.backendError = response.errorMessages[0];
            setTimeout(() => {
              this.backendError = '';
            }, 3000);
          }
          else {
            console.log(response);
          }
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }
}

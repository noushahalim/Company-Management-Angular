import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{
  constructor(
    private employeeService : EmployeeService,
    private formBuilder : FormBuilder,
    private route : Router
  ) { }

  creationForm!:FormGroup;
  error : any;

  ngOnInit(): void {
    this.creationForm = this.formBuilder.group({
      firstName:['',[Validators.required]],
      middleName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      birthDate:['',[Validators.required]],
      gender:['',[Validators.required]],
      parmenantAddress:['',[Validators.required]],
      currentAddress:['',[Validators.required]],
      isCurrentSameAsParmenantAddress:[false,[Validators.required]],
      personalEmailId:['',[Validators.required,Validators.email]],
      personalMobileNo:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
      otherContactNo:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
      employeeCode:['',[Validators.required]],
      joiningOn:[new Date().toISOString(),[Validators.required]]
    })  
  }

  onSubmit(){
    if(this.creationForm.valid){
      this.employeeService.createEmployee(this.creationForm.value).subscribe(
        (response)=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Created",
            showConfirmButton: false,
            timer: 1500
          });

          this.route.navigate(['/employees'])
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

  isCurrentSameAsParmenantAddress(){

    const checkBoxValue = this.creationForm.get('isCurrentSameAsParmenantAddress')?.value;

    if(!checkBoxValue){
      const permanentAddress = this.creationForm.get('parmenantAddress')?.value;
      if(permanentAddress){
        this.creationForm.patchValue({ currentAddress: permanentAddress });
      }
    }
    else{
      this.creationForm.patchValue({currentAddress : ''})
    }
  }

}

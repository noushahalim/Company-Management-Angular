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
          const data = {
            pageSize: 8,
            pageIndex: 0,
            searchKeyword: ''
          };
          
          this.employeeService.getAllEmployees(data).subscribe(
            (response) => {
              const employees = response.data.result.map((employee: any) => {
                if (!employee.profilePhotoName) {
                  const randomColor = this.getRandomTailwindColor();
                  employee.bg = randomColor;
                }
                return employee;
              });
              
              this.employeeService.employees = employees;
              this.employeeService.employeesCount = response.data.count;
            },
            (error) => {
              console.log(error);
            }
          );
          
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

  tailwindBgColors : string[] = ['bg-red-500','bg-blue-500','bg-green-500','bg-yellow-500','bg-purple-500','bg-pink-500','bg-indigo-500','bg-teal-500','bg-orange-500'];

  getRandomTailwindColor(): string {
    const randomIndex = Math.floor(Math.random() * this.tailwindBgColors.length);
    return this.tailwindBgColors[randomIndex];
  }
}

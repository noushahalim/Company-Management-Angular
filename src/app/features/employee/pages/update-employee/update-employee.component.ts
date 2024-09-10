import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit{
  constructor(
    private employeeService : EmployeeService,
    private formBuilder : FormBuilder,
    private route : Router,
    private authService : AuthService,
    private activatedRoute: ActivatedRoute
  ) { }
  
  updationForm!:FormGroup;
  profileChangeForm!:FormGroup;
  profile! : string;
  employeeData! : Employee;
  allDesignations! : [{ id:string, name:string, description: string}];
  selectedDesignation! : { id:string, name:string, description: string}
  allDepartments! : [{ id:string, name:string, description: string}];
  selectedDepartment! : { id:string, name:string, description: string}
  error : any;
  showChangeProfileModal : boolean = false;
  buttonDisabled:boolean=false
  previewImageSrc : string='';
  imageFile : any = null;

  ngOnInit(): void {
    if(this.authService.profileImage){
      this.profile = this.authService.profileImage;
    }

    this.activatedRoute.data.subscribe(
      (data)=>{
        this.employeeData = data['employeeData'].data;
        
      },
      (error)=>{
        console.log(error);
      }
    )
    this.updationForm = this.formBuilder.group({
      id:['',[Validators.required]],
      firstName:['',[Validators.required]],
      middleName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      officeEmailId:['',[Validators.email]],
      officeContactNo:['',[Validators.pattern(/^\d{10}$/)]],
      joiningOn:['',[Validators.required]],
      relievingOn:[''],
      confirmationOn:[''],
      resignationOn:[''],
      designationId:[''],
      reportingToId:[''],
      departmentId:['']
    })  

    this.updationForm.patchValue(this.employeeData)

    this.profileChangeForm = this.formBuilder.group({
      image:[[],Validators.required]
    })

    const data = {
      "searchKeyword": "",
      "pageIndex": 0,
      "pageSize": 0
    };
    
    this.employeeService.GetAllDepartments(data).subscribe(
      (response)=>{
        if (response?.data?.result) {
          this.selectedDepartment = response.data.result.find(
            (department: any) => department.id === this.employeeData.departmentId
          );
        }
        this.allDepartments = response.data.result;
      },
      (error)=>{
        console.log(error);
      }
    )

    this.employeeService.GetAllDesignations(data).subscribe(
      (response)=>{
        if (response?.data?.result) {
          this.selectedDesignation = response.data.result.find(
            (designation: any) => designation.id === this.employeeData.designationId
          );
        }
        this.allDesignations = response.data.result;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onSubmit(){
    if(this.updationForm.valid){
      this.employeeService.updateEmployee(this.updationForm.value).subscribe(
        (response)=>{

          this.employeeService.employeeDetails(this.employeeData.id).subscribe(
            (response)=>{
              this.employeeData = response.data;
              localStorage.setItem('firstName', response.data.firstName);
              this.authService.firstName = response.data.firstName;
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

  openModel(){
    this.showChangeProfileModal=true
  }

  closeModal(){
    this.showChangeProfileModal=false
  }

  onImageUpload(event:any){
    this.profileChangeForm.value.image = event.target.files[0];
    this.previewImageSrc = URL.createObjectURL(event.target.files[0]);
    this.imageFile = event.target.files[0]
  }

  updateLogo(){
    if (this.profileChangeForm.valid){
      this.buttonDisabled=true;

      const data= new FormData()
      data.append('Photo',this.imageFile);
      const employeeId = this.employeeData.id;
      if (employeeId) {
        data.append('Id', employeeId);
      } else {
        console.error('Employee ID is null or undefined');
        this.buttonDisabled = false;
        return;
      }

      this.employeeService.updateProfile(data).subscribe(
        (response)=>{
          this.employeeService.employeeDetails(this.employeeData.id).subscribe(
            (response)=>{
              this.employeeData = response.data;
              if(this.employeeData.profilePhotoName){
                const photoName = this.employeeData.profilePhotoName;
                const token = this.authService.token;
          
                this.profile = `${environment.baseUrl}/Employee/GetEmployeeProfilePhoto?photoName=${photoName}&token=${token}`;
          
                localStorage.setItem('profileImage', this.profile);
                this.authService.profileImage = this.profile;
                this.showChangeProfileModal=false;
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
      console.error('Form is invalid:', this.profileChangeForm.errors);
    }
  }

  deleteLogo(){
    Swal.fire({
      title: "Are you sure?",
      text: "You're Trying to Delete Profile!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!"
    }).then((result) => {
      if (result.isConfirmed) {
        const empolyeeId = this.employeeData.id;
        if (!empolyeeId) {
          console.error('Employee ID is null or undefined');
          return;
        }
        this.employeeService.removeProfile(empolyeeId).subscribe(
          (response)=>{
            this.employeeService.employeeDetails(this.employeeData.id).subscribe(
              (response)=>{
                this.employeeData = response.data;
                localStorage.removeItem('profileImage');
                this.authService.profileImage = '';
                this.profile = '';
  
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Deleted",
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
          }
        )
      }
    })
  }
}

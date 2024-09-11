import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../models/employee.model';
import { environment } from 'src/environment/environment';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit{
  constructor (
    private employeeService : EmployeeService,
    private authService : AuthService,
    private route : Router
  ){}

  openDropdownId : string | null = null;
  pageSize : number = 8;
  pageIndex : number = 0;
  searchKeyword : string = '';
  employees! : [Employee];
  baseUrl : string = '';
  api : string = '/Employee/GetEmployeeProfilePhoto';
  token : string = '';
  employeesCount : number = 0;
  tailwindBgColors : string[] = ['bg-red-500','bg-blue-500','bg-green-500','bg-yellow-500','bg-purple-500','bg-pink-500','bg-indigo-500','bg-teal-500','bg-orange-500'];

  ngOnInit(): void {
    this.baseUrl = environment.baseUrl;
    if(this.authService.token){
      this.token = this.authService.token;
    }

    this.loadEmployees();
  }

  loadEmployees() {
    const data = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      searchKeyword: this.searchKeyword
    };
  
    this.employeeService.getAllEmployees(data).subscribe(
      (response) => {
        this.employees = response.data.result.map((employee: any) => {
          if (!employee.profilePhotoName) {
            const randomColor = this.getRandomTailwindColor();
            employee.bg = randomColor;
          }
          return employee;
        });
        this.employeesCount = response.data.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRandomTailwindColor(): string {
    const randomIndex = Math.floor(Math.random() * this.tailwindBgColors.length);
    return this.tailwindBgColors[randomIndex];
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.employeesCount / this.pageSize);
    return new Array(totalPages).fill(0);
  }

  searchEmployees() {
    this.pageIndex = 0;
    this.loadEmployees();
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.loadEmployees();
    }
  }

  nextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.employeesCount) {
      this.pageIndex++;
      this.loadEmployees();
    }
  }

  goToPage(index: number) {
    this.pageIndex = index;
    this.loadEmployees();
  }

  letter (name : string){
    return name?.charAt(0);
  }

  toggleDropdown(employeeId : string) {
    this.openDropdownId = this.openDropdownId === employeeId ? null : employeeId;
  }

  updateEmployee(id: string){
    this.route.navigate(['/employees/updateEmployee/',id]);
  }
}

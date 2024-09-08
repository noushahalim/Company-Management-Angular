import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{
  constructor(private route:Router, private authService:AuthService){}

  userName! : string | null;
  profileImage! : string | null;
  navItems = [
    { label: 'Home', route: '/dashboard', icon: 'fas fa-home' },
    { label: 'Company', route: '/company', icon: 'fas fa-building' },
    { label: 'Employees', route: '/employees', icon: 'fas fa-users' },
    { label: 'Settings', route: '/settings', icon: 'fas fa-cog' },
  ];
  profileMenuOpen = false;
  firstLetter : string | undefined = ''

  @Input() currentRoute: string = '';

  ngOnInit(): void {
    this.userName = this.authService.firstName;
    this.profileImage = this.authService.profileImage;
    if(!this.profileImage){
      this.firstLetter = this.userName?.charAt(0);
    }
  }

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You're Trying to Loging Out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "You have been logged out",
          text: "Thank you",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.clear()
        this.authService.token = ''
        this.authService.refreshToken = ''
        this.authService.companyId = ''
        this.authService.firstName = ''
        this.authService.profileImage = ''
        this.route.navigate(['/auth/login'])
      }
    })
  }
}

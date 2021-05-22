import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isAuth: boolean =false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getAuthSub().subscribe(isAuth => {
      this.isAuth = isAuth;
    });
    this.isAuth = this.authService.isAuth();
  }

  logout() {
    this.authService.userLogout();
  }
}

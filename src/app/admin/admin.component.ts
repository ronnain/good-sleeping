import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    standalone: true,
    imports: [NgIf, MatButtonModule, MatMenuModule, RouterLink, RouterOutlet]
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

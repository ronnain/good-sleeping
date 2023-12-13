import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, NgIf, MatProgressBarModule]
})
export class LoginComponent implements OnInit {

  pseudo;
  password;

  showValidation: boolean = false;
  failSave: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    if(!this.pseudo || !this.password) {
      return;
    }
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;
    this.authService.checkUserLogin(this.pseudo, this.password).subscribe(
      data => {
        if(data === "User not found") {
          this.failSave = true;
        } else {
          this.authService.authentificationSuccess(this.pseudo, data);
          this.showValidation = true;
          const self = this;
          setTimeout(function(){ self.router.navigate(['/admin/mail']); }, 500);

        }
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.failSave = true;
      });
  }
}

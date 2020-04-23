import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pseudo;
  password;

  showValidation: boolean = false;
  failSave: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;
    this.authService.checkUserLogin(this.pseudo, this.password).subscribe(
      data => {
        if(data === "User not found") {
          this.failSave = true;
        } else {
          console.log(data);
          this.authService.authentificationSuccess(data);
          this.showValidation = true;
        }
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.failSave = true;
      });
  }

}

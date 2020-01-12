import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public httpClientModule: HttpClientModule, public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
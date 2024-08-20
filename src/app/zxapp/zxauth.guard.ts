import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ZXApplService } from './zxappl.service';
import { ZXNAV } from '../zxapi';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, public SY: ZXApplService) {}

  canActivate(): boolean {
    // if (this.authService.isLoggedIn() && !this.authService.isTokenExpired()) {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.authService.removeToken();
      this.router.navigate(['/login']);
      return false;
    }
  }
}

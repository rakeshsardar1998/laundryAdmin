import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { ZXAPI, ZXNAV } from 'src/app/zxapi';
import { AuthService } from 'src/app/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  HIDE: boolean = true;
  showPassword: boolean = false;

  FRUSR = this.FB.group({
    email: [, Validators.required],
    password: [, Validators.required]
  });

  constructor(
    private FB: FormBuilder,
    private ME: ZXApplService,
    private MW: ZXDataService,
    private authService: AuthService,
    private UI: ZXUIService) {
    ME.PAGE('LOGIN');
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  LOGIN(): void {
    try {
      this.MW.POST(ZXAPI.USER.LOGIN, this.FRUSR.value).subscribe(r => {
        console.log('xyz', r);
        if (r.token) {
          this.authService.setToken(JSON.stringify(r));
          this.ME.GOTO(ZXNAV.ONLOGIN);
          window.location.reload()
        } else {
          this.UI.POPUP('LOGIN FAILED', 'User ID and / or password is incorrect.');
        }
      }, (error: unknown) => {
        this.handleLoginError(error);
      });
    } catch (error) {
      this.handleLoginError(error);
    }
  }
  
  private handleLoginError(error: unknown): void {
    let errorMessage: string = 'An unknown error occurred during login. Please try again later.';
    if (error instanceof HttpErrorResponse) {
      if (error.error && error.error.error) {
        errorMessage = error.error.error;
      }
    }
    this.UI.SAY( errorMessage);
  }
}

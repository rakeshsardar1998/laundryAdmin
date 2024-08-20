import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule }  from '@angular/common/http';

import {MatIconModule}              from '@angular/material/icon';
import {MatButtonModule}            from '@angular/material/button';
import {MatToolbarModule}           from '@angular/material/toolbar';
import {MatSidenavModule}           from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZXAppModule } from './zxapp/zxapp.module';
import {MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { TokenInterceptor } from './token-interceptor.service';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,AppRoutingModule,HttpClientModule,ZXAppModule,
    MatIconModule, MatButtonModule, MatToolbarModule,MatSidenavModule,MatMenuModule,MatListModule 
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
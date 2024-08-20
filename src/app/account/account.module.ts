import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {ReactiveFormsModule}        from '@angular/forms';
import {MatFormFieldModule}         from '@angular/material/form-field';
import {MatInputModule}             from '@angular/material/input';
import {MatButtonModule}            from '@angular/material/button';
import {MatIconModule}              from '@angular/material/icon';
import { AuthGuard }                from '../zxapp/zxauth.guard'; 

import { LoginComponent }           from './login/login.component';
import { DefaultComponent }         from './default/default.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const _ROUTES: Routes = 
[
  {path: '',        component:DefaultComponent},
  {path: 'login',   component:LoginComponent},
  {path: 'home',   component:HomeComponent, canActivate: [AuthGuard] },
  {path: 'profile',  component:ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    LoginComponent,
    DefaultComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(_ROUTES),
    ReactiveFormsModule,MatFormFieldModule,MatInputModule,
    MatButtonModule,MatIconModule
  ]
})
export class AccountModule { }

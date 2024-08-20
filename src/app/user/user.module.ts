import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {ReactiveFormsModule}        from '@angular/forms';
import {MatFormFieldModule}         from '@angular/material/form-field';
import {MatInputModule}             from '@angular/material/input';
import {MatButtonModule}            from '@angular/material/button';
import {MatIconModule}              from '@angular/material/icon';
import {MatCardModule}              from '@angular/material/card';

import {MatTableModule}             from '@angular/material/table';
import {MatSortModule}              from '@angular/material/sort';
import {MatPaginatorModule}         from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { UserComponent } from './list/list.component';
import { UserViewComponent } from './view/view.component';
import { USerEditComponent } from './edit/edit.component';
import { AddnUserComponent } from './addn/addn.component';


const _ROUTES: Routes =
[
  {path: '',                      component:UserComponent},
  {path: 'view/:userId',           component:UserViewComponent},
  {path: 'edit/:userId',           component:AddnUserComponent},
  {path: 'add',                   component:AddnUserComponent}
];


@NgModule({
  declarations: [
    UserComponent,
    UserViewComponent,
    USerEditComponent,
    AddnUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(_ROUTES),
    CommonModule,
     RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class UserModule { }

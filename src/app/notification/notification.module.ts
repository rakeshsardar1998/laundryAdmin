import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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


import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';

const _ROUTES: Routes=[
  {path:'', component:ListComponent},
  {path:'add', component:AddComponent},
  {path:'view/:notificationId', component:ViewComponent},
  {path:'edit/:notificationId', component:AddComponent},
]

@NgModule({
  declarations: [
    ListComponent,
    ViewComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(_ROUTES),
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
export class NotificationModule { }

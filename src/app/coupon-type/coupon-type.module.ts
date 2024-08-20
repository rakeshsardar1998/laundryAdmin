import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
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


const _ROUTES: Routes =[
  {path:'', component:ListComponent},
  {path:'view/:couponTypeId', component:ViewComponent},
  {path:'edit/:couponTypeId', component:AddComponent},
  {path:'add', component:AddComponent},
]

@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    ViewComponent
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
export class CouponTypeModule { }

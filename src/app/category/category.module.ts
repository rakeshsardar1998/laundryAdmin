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



import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';

const _ROUTES: Routes =
[
  {path: '',                      component:CategoryListComponent},
  {path: 'view/:categoryId',           component:CategoryDetailsComponent},
  {path: 'edit/:categoryId',           component:AddCategoryComponent},
  {path: 'add',                   component:AddCategoryComponent}
];


@NgModule({
  declarations: [
    CategoryListComponent,
    AddCategoryComponent,
    CategoryDetailsComponent
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
export class CategoryModule { }

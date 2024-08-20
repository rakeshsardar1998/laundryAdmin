import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatFormFieldModule}         from '@angular/material/form-field';
import {MatInputModule}             from '@angular/material/input';
import {MatButtonModule}            from '@angular/material/button';
import {MatIconModule}              from '@angular/material/icon';
import {MatCardModule}              from '@angular/material/card';

import {MatTableModule}             from '@angular/material/table';
import {MatSortModule}              from '@angular/material/sort';
import {MatPaginatorModule}         from '@angular/material/paginator';

import { AddModuleComponent } from './add-module/add-module.component';
import { ModuleDetailsComponent } from './module-details/module-details.component';
import { ModuleListComponent } from './module-list/module-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



const _ROUTES: Routes =[
  {path:'', component:ModuleListComponent},
  {path:'add', component:AddModuleComponent},
  {path:'view',component:ModuleDetailsComponent},
  {path:'edit/:moduleId', component:AddModuleComponent}
]

@NgModule({
  declarations: [
    AddModuleComponent,
    ModuleDetailsComponent,
    ModuleListComponent
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
    MatPaginatorModule
  ]
})
export class ModuleModule { }

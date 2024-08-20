import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { AllProdductModalComponent } from './all-prodduct-modal/all-prodduct-modal.component';
import { LabelsModalComponent } from './labels-modal/labels-modal.component';
import { ChangeOrderModalComponent } from './change-order-modal/change-order-modal.component';
import { MatTooltipModule } from '@angular/material/tooltip';





const _ROUTES: Routes = [
  { path: '', component: ListComponent },
  { path: 'view/:orderId', component: ViewComponent }
]

@NgModule({
  declarations: [

    ListComponent,
    ViewComponent,
    AllProdductModalComponent,
    LabelsModalComponent,
    ChangeOrderModalComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(_ROUTES),
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
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTooltipModule

  ],
  providers: [
    DatePipe
  ],
})
export class OrdersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule,Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { ChangeRefundStatusModalComponent } from './change-refund-status-modal/change-refund-status-modal.component';


const _ROUTES: Routes=[
  {path:'', component:ListComponent},
  {path:'view/:refundId', component:ViewComponent},
]

@NgModule({
  providers: [DatePipe],
  declarations: [
    ListComponent,
    ViewComponent,
    ChangeRefundStatusModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(_ROUTES),
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    DatePipe,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTabsModule



    
  ]
})
export class RefundModule { }

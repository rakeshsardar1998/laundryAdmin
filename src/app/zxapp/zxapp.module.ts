  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { RouterModule } from '@angular/router';

  import {MatDialogModule} from '@angular/material/dialog';
  import {MatSnackBarModule} from '@angular/material/snack-bar';
  import {MatButtonModule} from '@angular/material/button';
  import {MatIconModule} from '@angular/material/icon';
  import {MatTooltipModule} from '@angular/material/tooltip';
  import {MatListModule} from '@angular/material/list';

  import { ZXPopComponent } from './zxpop/zxpop.component';
  import { ZXMenuComponent } from './zxmenu/zxmenu.component';


  @NgModule({
    declarations: [
      ZXPopComponent,
      ZXMenuComponent
    ],
    imports: [
      CommonModule,RouterModule,
      MatButtonModule,MatIconModule,MatTooltipModule,MatListModule,
      MatDialogModule,MatSnackBarModule
    ],
    exports:[
      MatDialogModule,MatSnackBarModule,ZXMenuComponent
    ]
  })
  export class ZXAppModule { }

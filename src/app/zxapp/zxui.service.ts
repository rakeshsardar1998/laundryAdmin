import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ZXPopComponent } from './zxpop/zxpop.component';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ZXUIService {

  constructor(public MD: MatDialog, public SB:MatSnackBar) { }

  toastAlertSuccess(): void {
    Swal.fire({
      toast: true,
      icon: 'success',
      title: 'Success',
      timer: 5000,
      showConfirmButton: false,
      position: 'top-end'
    });
  }

  POPUP(Title:string,Msg:string)
  {
    const dialogRef = this.MD.open(ZXPopComponent, {
      data: {HEAD:Title,BODY:Msg,BUTN:1},
    });
    return dialogRef.afterClosed();
  }
  CONFIRM(Title:string,Msg:string)
  {
    const dialogRef = this.MD.open(ZXPopComponent, {
      data: {HEAD:Title,BODY:Msg,BUTN:2},
    });
    return dialogRef.afterClosed();
  }
  
  SAY(Msg:string)
  {
    this.SB.open(Msg,'OKAY');
  }
  

}

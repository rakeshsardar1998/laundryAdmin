import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';

@Component({
  selector: 'app-orders-modal',
  templateUrl: './orders-modal.component.html',
  styleUrls: ['./orders-modal.component.css']
})
export class OrdersModalComponent {
  orders: any;
  constructor(private dialogRef: MatDialogRef<OrdersModalComponent>,
    private SY: ZXApplService,
    @Inject(MAT_DIALOG_DATA) public data: any,


  ) {}
  closeModal() {
    this.dialogRef.close()
  }
  ITEM(IT: any): void {
    if(IT.orderId){
      this.SY.OPEN('orders/view', IT.orderId);
      this.dialogRef.close();
    }
  }
}

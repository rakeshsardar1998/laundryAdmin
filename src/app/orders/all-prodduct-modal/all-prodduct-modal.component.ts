import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';


@Component({
  selector: 'app-all-prodduct-modal',
  templateUrl: './all-prodduct-modal.component.html',
  styleUrls: ['./all-prodduct-modal.component.css']
})
export class AllProdductModalComponent {
  product: any;
  constructor(
    private dialogRef: MatDialogRef<AllProdductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
      console.log(data)
      this.product = data.product; 
    }
closeModal() {
this.dialogRef.close()
}
}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ZXAPI } from 'src/app/zxapi';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';

@Component({
  selector: 'app-labels-modal',
  templateUrl: './labels-modal.component.html',
  styleUrls: ['./labels-modal.component.css']
})
export class LabelsModalComponent {
  product: any;
  LH: any;
  loading: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<LabelsModalComponent>,
    private MW: ZXDataService,
    public SY: ZXApplService,
    private UI: ZXUIService,
    @Inject(MAT_DIALOG_DATA) public orderId: any
    ){
      console.log(orderId)
      this.fetchData();
    }
  closeModal() {
    this.dialogRef.close()
  }

//   printLabels() {
//     const printContent = document.getElementById('modal-body-content');
//     if (printContent) {
//         const originalContents = document.body.innerHTML;
//         const bodyContent = printContent.innerHTML;
//         document.body.innerHTML = bodyContent;
//         window.print();
//         document.body.innerHTML = originalContents;
//         window.location.reload();
//     }
// }


  fetchData(): void {
    try {
      this.loading = true
        if (this.orderId) {
          const url = `${ZXAPI.ORDER.VIEW}/${this.orderId}/labels`;
          this.MW.GET(url).subscribe(
            (response: any) => {
              console.log('Response:', response);
              this.LH = response.data;
              this.loading = false
            },
            (error: any) => {
              console.error('Error fetching data:', error);
              this.UI.SAY('Error fetching data');
              this.loading = false
            }
          );
        }
      }
     catch (error) {
      console.error('An error occurred:', error);
      this.UI.SAY('An error occurred');
    }
  }
}

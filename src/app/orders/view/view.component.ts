import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXAPI } from 'src/app/zxapi';
import { ActivatedRoute } from '@angular/router';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { AllProdductModalComponent } from '../all-prodduct-modal/all-prodduct-modal.component';
import { LabelsModalComponent } from '../labels-modal/labels-modal.component';
import { ChangeOrderModalComponent } from '../change-order-modal/change-order-modal.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  animations: [
    trigger('statusChange', [
      transition('void => *', [
        style({ backgroundColor: 'green' }),
        animate('2s', style({ backgroundColor: 'red' }))
      ])
    ])
  ]
})

export class ViewComponent implements OnInit {
  LH: any = {};
  loading: boolean = false;
  totalQuantity: number = 0;
  DATA: any = [];
  LABELSDATA: any = [];
  orderId: any;

  constructor(
    private AR: ActivatedRoute,
    private MW: ZXDataService,
    public SY: ZXApplService,
    private UI: ZXUIService,
    private dialog: MatDialog
  ) {
    SY.PAGE('ORDER DETAILS');
  }

  openProductModal(data: any) {
    this.dialog.open(AllProdductModalComponent,{
      data: data,
    });
  }

  openLabelsModal() {
    this.dialog.open(LabelsModalComponent, {
      data: this.orderId
    });
  }
//   printLabels() {
//     const dialogRef = this.dialog.open(LabelsModalComponent, {
//         data: this.orderId,
//         disableClose: true, // Disable closing the modal by clicking outside or pressing Escape
//         autoFocus: false // Disable auto focusing on the modal
//     });

//     setTimeout(() => {
//         dialogRef.componentInstance.printLabels();
//         dialogRef.close(); // Close the modal after printing
//     }, 900); 
// }
printLabels() {
  try {
    this.loading = true;
    if (this.orderId) {
      const url = `${ZXAPI.ORDER.VIEW}/${this.orderId}/labels`;
      this.MW.GET(url).subscribe(
        (response: any) => {
          console.log('Response:', response);
          this.LABELSDATA = response.data;
          this.loading = false;
          if (this.LABELSDATA) {
            setTimeout(() => { // Adding a slight delay
              const printContent = document.getElementById('modal-body-content');
              if (printContent) {
                const originalContents = document.body.innerHTML;
                const bodyContent = printContent.innerHTML;
                document.body.innerHTML = bodyContent;
                window.print();
                document.body.innerHTML = originalContents;
                window.location.reload();
              }
            }, 100); // Adjust the delay time as needed
          }
        },
        (error: any) => {
          console.error('Error fetching data:', error);
          this.UI.SAY('Error fetching data');
          this.loading = false;
        }
      );
    }
  } catch (error) {
    console.error('An error occurred:', error);
    this.UI.SAY('An error occurred');
    this.loading = false;
  }
}


  openChangeOrderStatusModal(data: any) {
    const dialogRef = this.dialog.open(ChangeOrderModalComponent, {
      width: "600px",
      data: data
    });

    dialogRef.componentInstance.orderStatusChanged.subscribe(() => {
      this.fetchData();
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true;
    try {
      this.AR.params.subscribe(params => {
        const orderId = parseInt(params['orderId']);
        if (orderId) {
          this.orderId = orderId;
          const url = `${ZXAPI.ORDER.VIEW}/${orderId}`;
          this.MW.GET(url).subscribe(
            (response: any) => {
              console.log('Response:', response);
              this.LH = response.data;
              this.totalQuantity = 0; // Reset total quantity
              for (let item of this.LH.cart.carts) {
                this.totalQuantity += item.quantity;
              }
              this.loading = false; // Set loading to false after data is loaded
            },
            (error: any) => {
              console.error('Error fetching data:', error);
              this.UI.SAY('Error fetching data');
              this.loading = false; // Ensure loading is set to false in case of error
            }
          );
        }
      });
    } catch (error) {
      console.error('An error occurred:', error);
      this.UI.SAY('An error occurred');
      this.loading = false; // Stop loading
    }
}


  updatepaymentstatus(IT: any){
    try {
      const url = `${ZXAPI.ORDER.VIEW}/${IT.orderId}/updatepaymentstatus`;
      this.loading = true;
      this.MW.PUT(url,{paymentStatus: "Paid"}).subscribe(
        (r: any) => {
          this.UI.toastAlertSuccess()
          this.loading = false; 
          this.fetchData();
        },
        (error: any) => {
          this.UI.SAY('Error approve feedback');
          this.loading = false; 
        }
      );
    } catch (error) {
      this.UI.SAY('Error deleting feedback');
      this.loading = false; 
    }
  }

  isStatusNameMatch(item: any): boolean {
    const foundLog = this.LH.statusChangeLogs.find((log: { orderStatusId: any; }) => log.orderStatusId === item.orderStatusId);
    console.log('rit',foundLog)
    return foundLog ? foundLog.orderStatus.statusName : false;
  }

  getStatusCreatedAt(item: any): Date {
    console.log('fhgwe',item)
    const foundLog = this.LH.statusChangeLogs.find((log: { orderStatusId: any; }) => log.orderStatusId === item.orderStatusId);
    console.log('foundLog',foundLog)
    return foundLog ? foundLog.orderStatus.createdAt : null;
  }
}

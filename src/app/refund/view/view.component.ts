import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXAPI } from 'src/app/zxapi';
import { ActivatedRoute } from '@angular/router';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChangeRefundStatusModalComponent } from '../change-refund-status-modal/change-refund-status-modal.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  LH: any = {};
  loading: boolean = false;
  totalQuantity: number = 0;
  DATA: any = [];

  constructor(
    private AR: ActivatedRoute,
    private MW: ZXDataService,
    public SY: ZXApplService,
    private UI: ZXUIService,
    private dialog: MatDialog
  ) {
    SY.PAGE('REFUND DETAILS');
  }
  openChangeRefundStatusModal(data: any) {
    const dialogRef = this.dialog.open(ChangeRefundStatusModalComponent, {
      width: "600px",
      data: data
    });

    dialogRef.componentInstance.refundStatusChanged.subscribe(() => {
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
        const refundId = parseInt(params['refundId']);
        if (refundId) {
          const url = `${ZXAPI.REFUND.VIEW}/${refundId}`;
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


  updateRefundstatus(IT: any) {
    try {
      const url = `${ZXAPI.REFUND.VIEW}/${IT.refundId}`;
      this.loading = true;
      this.MW.PUT(url, { paymentStatus: "Paid" }).subscribe(
        (r: any) => {
          this.UI.toastAlertSuccess()
          this.loading = false;
          this.fetchData();
        },
        (error: any) => {
          this.UI.SAY('Error approve Refund');
          this.loading = false;
        }
      );
    } catch (error) {
      this.UI.SAY('Error deleting Refund');
      this.loading = false;
    }
  }
}

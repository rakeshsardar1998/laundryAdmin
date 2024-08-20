import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { ZXAPI } from 'src/app/zxapi';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent  implements OnInit {
  constructor(
    private AR: ActivatedRoute,
    private FB: FormBuilder,
    private MW: ZXDataService,
    public SY: ZXApplService,
    private UI: ZXUIService
  ) { 
  }

  roles: any = [];
  isEdit: boolean = false;
  orderStatusId: any;
  loading: boolean = false; // Flag to track loading state
  ORDERSTATUSFR = this.FB.group({
    statusName: [ ,Validators.required],
    serial: [],
    isActive: [true]
  });

  ngOnInit(): void {
    this.fetchData();
    this.SY.PAGE(this.isEdit ? 'EDIT ORDERSTATUS' : 'ADD ORDERSTATUS')
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const orderStatusId = parseInt(params['orderStatusId']);
        if (orderStatusId) {
          this.orderStatusId = orderStatusId;
          this.isEdit = true;
          const url = `${ZXAPI.ORDERSTATUS.VIEW}/${orderStatusId}`;
          this.loadWithLoader(this.MW.GET(url), 'Error fetching data').subscribe(
            (response: any) => {
              console.log('Response:', response);
              this.setFormValues(response.data); 
            }
          );
        }
      });
    } catch (error) {
      console.error('An error occurred:', error);
      this.UI.SAY('An error occurred');
    } finally {
      this.loading = false; // Stop loading
    }
  }

  setFormValues(data: any): void {
    this.ORDERSTATUSFR.patchValue(data); 
  }

  SAVE() {
    if (this.isEdit) {
      // let data = {
      //   name: this.ROLEFR.value.categoryName,
      // };
      const url = `${ZXAPI.ORDERSTATUS.VIEW}/${this.orderStatusId}`;
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.PUT(url, this.ORDERSTATUSFR.value), 'Error updating Order Status').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('order-status');
          } else {
            this.UI.SAY('Order Status could not be saved');
          }
        }
      );
    } else {
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.POST(ZXAPI.ORDERSTATUS.VIEW, this.ORDERSTATUSFR.value), 'Error saving Order Status').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('order-status');
          } else {
            this.UI.SAY('Order Status could not be saved');
          }
        }
      );
    }
  }

  loadWithLoader(apiCall: any, errorMessage: string) {
    return new Observable(observer => {
      apiCall.subscribe(
        (response: any) => {
          observer.next(response);
        },
        (error: any) => {
          console.error(errorMessage, error);
          this.UI.SAY(errorMessage);
          observer.error(error);
          this.loading = false;
        },
        () => {
          this.loading = false; // Stop loading
          observer.complete();
        }
      );
    });
  }
}

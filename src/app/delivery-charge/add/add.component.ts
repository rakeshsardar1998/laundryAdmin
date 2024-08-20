import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators }  from '@angular/forms';

import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { ZXAPI } from 'src/app/zxapi';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';

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

  deliveryChargeType: any = [];
  isEdit: boolean = false;
  deliveryChargeId: any;
  loading: boolean = false; // Flag to track loading state
  FR = this.FB.group({
    pinCode: [],
    deliveryChargeTypeId: [, Validators.required],
    deliveryChargeAmount: [, Validators.required],
    minOrderAmount: [],
    isActive: [true]
  });

  ngOnInit(): void {
    this.fetchData();
    this.SY.PAGE(this.isEdit ? 'EDIT DELIVERYCHARGE' : 'ADD DELIVERYCHARGE');
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const deliveryChargeId = parseInt(params['deliveryChargeId']);
        if (deliveryChargeId) {
          this.deliveryChargeId = deliveryChargeId;
          this.isEdit = true;
          const url = `${ZXAPI.DELIVARY.VIEW}/${deliveryChargeId}`;
          this.loadWithLoader(this.MW.GET(url), 'Error fetching data').subscribe(
            (response: any) => {
              console.log('Response:', response);
              this.setFormValues(response.data); 
            }
          );
        }
      });
      this.loadWithLoader(this.MW.GET(ZXAPI.DELIVARY.DD), 'Error fetching delivery charge type').subscribe(
        (r: any) => {
          console.log('Response from API:', r);
          this.deliveryChargeType = r.data;
        }
      );
    } catch (error) {
      console.error('An error occurred:', error);
      this.UI.SAY('An error occurred');
    } finally {
      this.loading = false; 
    }
  }

  setFormValues(data: any): void {
    this.FR.patchValue(data); 
  }

  SAVE() {
    if (this.isEdit == true) {
      // let data = {
      //   name: this.FR.value.categoryName,
      // };
      const url = `${ZXAPI.DELIVARY.VIEW}/${this.deliveryChargeId}`;
      this.loadWithLoader(this.MW.PUT(url, this.FR.value), 'Error updating delivery charge').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('delivery-charge');
          } else {
            this.UI.SAY('Delivery charge could not be saved');
          }
        }
      );
    } else {
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.POST(ZXAPI.DELIVARY.VIEW, this.FR.value), 'Error saving delivery charge').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('delivery-charge');
          } else {
            this.UI.SAY('Delivery charge could not be saved');
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
          this.loading = false;
          observer.error(error);
        },
        () => {
          this.loading = false; // Stop loading
          observer.complete();
        }
      );
    });
  }
}


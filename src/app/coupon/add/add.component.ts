import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';

import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { ZXAPI } from 'src/app/zxapi';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  COUPONTFR: FormGroup;
  couponType: any = [];
  isEdit: boolean = false;
  couponId: any;
  loading: boolean = false; // Flag to track loading state

  constructor(
    private AR: ActivatedRoute,
    private FB: FormBuilder,
    private MW: ZXDataService,
    public SY: ZXApplService,
    private UI: ZXUIService
  ) {
    this.COUPONTFR = this.FB.group({
      couponTypeId: [, Validators.required],
      couponCode: [, Validators.required],
      discountType: [, Validators.required],
      couponDescriptions: [],
      couponExpiryDate: [],
      totalUsageLimit: [],
      minOrderAmount: [],
      maxOrderAmount: [],
      discountAmount: [, Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.fetchData();
    if (this.isEdit) {
      this.SY.PAGE('EDIT COUPON');
    } else {
      this.SY.PAGE('ADD COUPON');
    }
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const couponId = parseInt(params['couponId']);
        if (couponId) {
          this.couponId = couponId;
          this.isEdit = true;
          const url = `${ZXAPI.COUPON.VIEW}/${couponId}`;
          this.loadWithLoader(this.MW.GET(url), 'Error fetching data').subscribe(
            (response: any) => {
              console.log('Response:', response);
              this.setFormValues(response.data);
            },
            error => {
              throw error;
            }
          );
        }
      });

      this.loadWithLoader(this.MW.GET(ZXAPI.COUPON.DD), 'Error fetching coupon types').subscribe(
        (r: any) => {
          console.log('Response from API:', r);
          this.couponType = r.data;
        },
        error => {
          throw error;
        }
      );
    } catch (error) {
      console.error('An error occurred:', error);
      this.UI.SAY('An error occurred');
    } finally {
      this.loading = false; // Stop loading
    }
  }

  setFormValues(data: any): void {
    this.COUPONTFR.patchValue(data);
  }

  SAVE() {
    if (this.isEdit) {
      const url = `${ZXAPI.COUPON.VIEW}/${this.couponId}`;
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.PUT(url, this.COUPONTFR.value), 'Error updating coupon').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('coupon');
          } else {
            this.UI.SAY('Coupon could not be saved');
          }
        },
        error => {
          throw error;
        }
      );
    } else {
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.POST(ZXAPI.COUPON.VIEW, this.COUPONTFR.value), 'Error saving coupon').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('coupon');
          } else {
            this.UI.SAY('Coupon could not be saved');
          }
        },
        error => {
          throw error;
        }
      );
    }
  }

  loadWithLoader(apiCall: any, errorMessage: string): Observable<any> {
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

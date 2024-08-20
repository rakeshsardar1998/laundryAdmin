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
export class AddComponent {
  constructor(
    private AR: ActivatedRoute,
    private FB: FormBuilder,
    private MW: ZXDataService,
    public SY: ZXApplService,
    private UI: ZXUIService
  ) { 
    
  }

  coupons: any = [];
  isEdit: boolean = false;
  couponTypeId: any;
  loading: boolean = false; // Flag to track loading state
  COUPONTFR = this.FB.group({
    couponTypeName: ['', Validators.required],
    isActive: [true, Validators.required]
  });

  ngOnInit(): void {
    this.fetchData();
    if(this.isEdit){
      this.SY.PAGE('EDIT COUPON');
    }else{
      this.SY.PAGE('ADD COUPON')
    };
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const couponTypeId = parseInt(params['couponTypeId']);
        if (couponTypeId) {
          this.couponTypeId = couponTypeId;
          this.isEdit = true;
          const url = `${ZXAPI.COUPON.VIEW}/${couponTypeId}`;
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
    this.COUPONTFR.patchValue(data); 
  }

  SAVE() {
    if (this.isEdit == true) {
      const url = `${ZXAPI.COUPON.VIEW}/${this.couponTypeId}`;
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.PUT(url, this.COUPONTFR.value), 'Error updating user').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('coupon');
          } else {
            this.UI.SAY('User could not be saved');
          }
        }
      );
    } else {
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.POST(ZXAPI.COUPON.VIEW, this.COUPONTFR.value), 'Error saving category').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.SAY(r.msg);
            this.SY.GOTO('coupon');
          } else {
            this.UI.SAY('Category could not be saved');
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
        },
        () => {
          this.loading = false; // Stop loading
          observer.complete();
        }
      );
    });
  }
}

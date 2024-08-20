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
export class AddComponent implements OnInit {
  constructor(
    private AR: ActivatedRoute,
    private FB: FormBuilder,
    private MW: ZXDataService,
    public SY: ZXApplService,
    private UI: ZXUIService
  ) { 
  }
  isEdit: boolean = false;
  pincodeId: any;
  loading: boolean = false; // Flag to track loading state
  PINFR = this.FB.group({
    pincode: [, Validators.required],
    // serial: ['', Validators.required],
    isActive: [true]
  });

  ngOnInit(): void {
    this.fetchData();
    this.SY.PAGE(this.isEdit ? 'EDIT REVIEWRATINGS' : 'ADD REVIEWRATINGS')
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const pincodeId = parseInt(params['pincodeId']);
        if (pincodeId) {
          this.pincodeId = pincodeId;
          this.isEdit = true;
          const url = `${ZXAPI.PINCODE.VIEW}/${pincodeId}`;
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
    this.PINFR.patchValue(data); 
  }

  SAVE() {
    if (this.isEdit == true) {
      // let data = {
      //   name: this.PINFR.value.categoryName,
      // };
      const url = `${ZXAPI.PINCODE.VIEW}/${this.pincodeId}`;
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.PUT(url, this.PINFR.value), 'Error updating pincode').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('pincode');
          } else {
            this.UI.SAY('Pincode could not be saved');
          }
        }
      );
    } else {
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.POST(ZXAPI.PINCODE.VIEW, this.PINFR.value), 'Error saving pincode').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('pincode');
          } else {
            this.UI.SAY('Pincode could not be saved');
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

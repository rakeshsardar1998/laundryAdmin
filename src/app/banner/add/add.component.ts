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
export class AddComponent implements OnInit {
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
  bannerId: any;
  loading: boolean = false; // Flag to track loading state
  CATFR = this.FB.group({
    bannerName: [,Validators.required],
    image: [,Validators.required],
    serial: [],
    isActive: [true]
  });

  ngOnInit(): void {
    this.SY.PAGE(this.isEdit ? 'EDIT BANNER' : 'ADD BANNER');
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const bannerId = parseInt(params['bannerId']);
        if (bannerId) {
          this.bannerId = bannerId;
          this.isEdit = true;
          const url = `${ZXAPI.BANNER.VIEW}/${bannerId}`;
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
    this.CATFR.patchValue(data); 
  }

  SAVE() {
    if (this.isEdit) {
      // let data = {
      //   name: this.CATFR.value.categoryName,
      // };
      const url = `${ZXAPI.BANNER.VIEW}/${this.bannerId}`;
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.PUT(url, this.CATFR.value), 'Error updating Banner').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('banner');
          } else {
            this.UI.SAY('Banner could not be saved');
          }
        }
      );
    } else {
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.POST(ZXAPI.BANNER.VIEW, this.CATFR.value), 'Error saving Banner').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('banner');
          } else {
            this.UI.SAY('Banner could not be saved');
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
          this.loading = false;
          observer.complete();
        }
      );
    });
  }
}

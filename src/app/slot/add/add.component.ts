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

  roles: any = [];
  isEdit: boolean = false;
  slotId: any;
  loading: boolean = false; // Flag to track loading state
  SLOTFR = this.FB.group({
    day: [,Validators.required],
    time: [,Validators.required],
    slotLimit: [Validators.required],
    isActive: [true,]
  });

  ngOnInit(): void {
    this.fetchData();
    if(this.isEdit){
      this.SY.PAGE('EDIT SLOT');
    }else{
      this.SY.PAGE('ADD SLOT')
    };
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const slotId = parseInt(params['slotId']);
        if (slotId) {
          this.slotId = slotId;
          this.isEdit = true;
          const url = `${ZXAPI.SLOT.VIEW}/${slotId}`;
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
    this.SLOTFR.patchValue(data); 
  }

  SAVE() {
    if (this.isEdit == true) {
      const url = `${ZXAPI.SLOT.VIEW}/${this.slotId}`;
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.PUT(url, this.SLOTFR.value), 'Error updating Slot').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('slot');
          } else {
            this.UI.SAY('Slot could not be saved');
          }
        }
      );
    } else {
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.POST(ZXAPI.SLOT.VIEW, this.SLOTFR.value), 'Error saving Slot').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('slot');
          } else {
            this.UI.SAY('Slot could not be saved');
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

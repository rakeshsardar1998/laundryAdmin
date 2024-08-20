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

  notifications: any = [];
  DATA: any;
  isEdit: boolean = false;
  notificationId: any;
  loading: boolean = false; // Flag to track loading state
  NOTIFICATIONFR = this.FB.group({
    notificationTitle: [ ,Validators.required],
    notificationMessage: [ ,Validators.required],
    notificationType: [ ,Validators.required],
    notificationFor: [ ,Validators.required],
    isRead: [],
    expiryDate: [],
    priority: [ ],
    isActive: [true]
  });

  ngOnInit(): void {
    this.fetchData();
    this.SY.PAGE(this.isEdit ? 'EDIT NOTIFICATION' : 'ADD NOTIFICATION')
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const notificationId = parseInt(params['notificationId']);
        if (notificationId) {
          this.notificationId = notificationId;
          this.isEdit = true;
          const url = `${ZXAPI.NOTIFICATION.VIEW}/${notificationId}`;
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
  FILTER(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DATA.filter = filterValue.trim().toLowerCase();
  }

  setFormValues(data: any): void {
    this.NOTIFICATIONFR.patchValue(data); 
  }

  SAVE() {
    if (this.isEdit) {
      // let data = {
      //   name: this.ROLEFR.value.categoryName,
      // };
      const url = `${ZXAPI.NOTIFICATION.VIEW}/${this.notificationId}`;
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.PUT(url, this.NOTIFICATIONFR.value), 'Error updating Notification').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('notification');
          } else {
            this.UI.SAY('Notification could not be saved');
          }
        }
      );
    } else {
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.POST(ZXAPI.NOTIFICATION.VIEW, this.NOTIFICATIONFR.value), 'Error saving Notification').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('notification');
          } else {
            this.UI.SAY('Notification could not be saved');
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


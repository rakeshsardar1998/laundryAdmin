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
  userId: any;
  loading: boolean = false; // Flag to track loading state
  USRFR = this.FB.group({
    email: [{ value: '', disabled: false }, Validators.required],
    password: [, Validators.required],
    name: [, Validators.required],
    isActive: [true],
    roleId: ['', Validators.required]
  });

  ngOnInit(): void {
    this.fetchData();
    if(this.isEdit){
      this.SY.PAGE('EDIT USER');
    }else{
      this.SY.PAGE('ADD USER')
    };
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const userId = parseInt(params['userId']);
        if (userId) {
          this.userId = userId;
          this.isEdit = true;
          const url = `${ZXAPI.PPLE.VIEW}/${userId}/profile`;
          this.loadWithLoader(this.MW.GET(url), 'Error fetching data').subscribe(
            (response: any) => {
              console.log('Response:', response);
              this.setFormValues(response.data); 
            }
          );
        }
      });
      this.loadWithLoader(this.MW.GET(ZXAPI.ROLE.DD), 'Error fetching roles').subscribe(
        (r: any) => {
          console.log('Response from API:', r);
          this.roles = r.data;
        }
      );
    } catch (error) {
      console.error('An error occurred:', error);
      this.UI.SAY('An error occurred');
      this.loading = false;
    }
  }

  setFormValues(data: any): void {
    this.USRFR.patchValue(data); 
    if (this.isEdit) {
      this.USRFR.get('email')?.disable();
    }
  }

  SAVE() {
    this.loading = true; 
    try {
      if(this.isEdit == true){
        let data = {
          name: this.USRFR.value.name,
          isActive: this.USRFR.value.isActive,
          roleId: this.USRFR.value.roleId,
        }
        const url = `${ZXAPI.PPLE.VIEW}/${this.userId}/update`;
        this.loadWithLoader(this.MW.PUT(url, data), 'Error updating user').subscribe(
          (r: any) => {
            console.log('res', r)
            if (r.status == 200) {
              this.UI.toastAlertSuccess()
              this.SY.GOTO('customers');
            } else {
              this.UI.SAY('User could not be saved');
            }
          }
        );
      } else {
        this.loadWithLoader(this.MW.POST(ZXAPI.PPLE.VIEW, this.USRFR.value), 'Error saving user').subscribe(
          (r: any) => {
            console.log('res', r)
            if (r.status == 200) {
              this.UI.SAY(r.msg);
              this.SY.GOTO('customers');
            } else {
              this.UI.SAY('User could not be saved');
            }
          }
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
      this.UI.SAY('An error occurred');
      this.loading = false; // Stop loading
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
          this.loading = false; // Stop loading
        },
        () => {
          this.loading = false; // Stop loading
          observer.complete();
        }
      );
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { ZXAPI } from 'src/app/zxapi';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
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
  roleId: any;
  loading: boolean = false; // Flag to track loading state
  ROLEFR = this.FB.group({
    roleName: [ ,Validators.required],
    isActive: [true]
  });

  ngOnInit(): void {
    this.fetchData();
    this.SY.PAGE(this.isEdit ? 'EDIT ROLE' : 'ADD ROLE')
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const roleId = parseInt(params['roleId']);
        if (roleId) {
          this.roleId = roleId;
          this.isEdit = true;
          const url = `${ZXAPI.ROLE.VIEW}/${roleId}`;
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
    this.ROLEFR.patchValue(data); 
  }

  SAVE() {
    if (this.isEdit) {
      // let data = {
      //   name: this.ROLEFR.value.categoryName,
      // };
      const url = `${ZXAPI.ROLE.VIEW}/${this.roleId}`;
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.PUT(url, this.ROLEFR.value), 'Error updating Role').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('role');
          } else {
            this.UI.SAY('Role could not be saved');
          }
        }
      );
    } else {
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.POST(ZXAPI.ROLE.VIEW, this.ROLEFR.value), 'Error saving Role').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('role');
          } else {
            this.UI.SAY('Role could not be saved');
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

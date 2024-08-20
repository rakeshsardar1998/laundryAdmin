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
    SY.PAGE('NEW SUBCATEGORY');
  }

  roles: any = [];
  isEdit: boolean = false;
  subCategoryId: any;
  loading: boolean = false; // Flag to track loading state
  SCATFR = this.FB.group({
    subCategoryName: [, Validators.required],
    subCategoryImage: [],
    thumbnailImage: [, Validators.required],
    categoryId: [, Validators.required],
    serial: [],
    isActive: [true],
  });

  ngOnInit(): void {
    this.fetchData();
    if (this.isEdit) {
      this.SY.PAGE('EDIT SUBCATEGORY');
    } else {
      this.SY.PAGE('ADD SUBCATEGORY')
    };
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const subCategoryId = parseInt(params['subCategoryId']);
        if (subCategoryId) {
          this.subCategoryId = subCategoryId;
          this.isEdit = true;
          const url = `${ZXAPI.SUBCATEGORY.VIEW}/${subCategoryId}`;
          this.loadWithLoader(this.MW.GET(url), 'Error fetching data').subscribe(
            (response: any) => {
              console.log('Response:', response);
              this.setFormValues(response.data);
            }
          );
        }
      });
      this.loadWithLoader(this.MW.GET(ZXAPI.CATEGORY.DD), 'Error fetching category').subscribe(
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
    this.SCATFR.patchValue(data);
  }

  SAVE() {
    this.loading = true;
    try {
      if (this.isEdit == true) {
        const url = `${ZXAPI.SUBCATEGORY.VIEW}/${this.subCategoryId}`;
        this.loadWithLoader(this.MW.PUT(url, this.SCATFR.value), 'Error updating subCategory').subscribe(
          (r: any) => {
            console.log('res', r)
            if (r.status == 200) {
              this.UI.toastAlertSuccess()
              this.SY.GOTO('sub-category');
            } else {
              this.UI.SAY('subCategory could not be saved');
            }
          }
        );
      } else {
        this.loadWithLoader(this.MW.POST(ZXAPI.SUBCATEGORY.VIEW, this.SCATFR.value), 'Error saving subCategory').subscribe(
          (r: any) => {
            console.log('res', r)
            if (r.status == 200) {
              this.UI.toastAlertSuccess()
              this.SY.GOTO('sub-category');
            } else {
              this.UI.SAY('subCategory could not be saved');
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { ZXAPI } from 'src/app/zxapi';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  constructor(
    private AR: ActivatedRoute,
    private FB: FormBuilder,
    private MW: ZXDataService,
    public SY: ZXApplService,
    private UI: ZXUIService
  ) { 
  }

  roles: any = [];
  isEdit: boolean = true;
  categoryId: any;
  loading: boolean = false; // Flag to track loading state
  CATFR = this.FB.group({
    categoryName: [, Validators.required],
    categoryImage: [],
    serial: [],
    isActive: [true]
  });

  ngOnInit(): void {
    this.fetchData();
    if(!this.isEdit){
      this.SY.PAGE('EDIT CATEGORY');
    }else{
      this.SY.PAGE('ADD CATEGORY')
    };
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const categoryId = parseInt(params['categoryId']);
        if (categoryId) {
          this.categoryId = categoryId;
          this.isEdit = false;
          const url = `${ZXAPI.CATEGORY.VIEW}/${categoryId}`;
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
    if (this.isEdit == false) {
      // let data = {
      //   name: this.CATFR.value.categoryName,
      // };
      const url = `${ZXAPI.CATEGORY.VIEW}/${this.categoryId}`;
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.PUT(url, this.CATFR.value), 'Error updating category').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess();
            this.SY.GOTO('category');
          } else {
            this.UI.SAY('Category could not be saved');
          }
        }
      );
    } else {
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.POST(ZXAPI.CATEGORY.VIEW, this.CATFR.value), 'Error saving category').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess();
            this.SY.GOTO('category');
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

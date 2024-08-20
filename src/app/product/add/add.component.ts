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
  productId: any;
  loading: boolean = false; 
  subCategoryData: any = [];
  categoryData: any = [];
  PRODFR = this.FB.group({
    productName: [,Validators.required],
    price: [,Validators.required],
    thumbnailImage: [],
    categoryId: [,Validators.required],
    subCategoryId: [,Validators.required],
    serial: [],
    shortDescription: [],
    longDescription: [],
    isActive: [true],
  });

  ngOnInit(): void {
    this.fetchData();
    if(this.isEdit){
      this.SY.PAGE('EDIT PRODUCT');
    }else{
      this.SY.PAGE('ADD PRODUCT')
    };
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const productId = parseInt(params['productId']);
        if (productId) {
          this.productId = productId;
          this.isEdit = true;
          const url = `${ZXAPI.PRODUCT.VIEW}/${productId}`;
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
          this.categoryData = r.data;
        }
      );
      this.loadWithLoader(this.MW.GET(ZXAPI.SUBCATEGORY.DD), 'Error fetching subCategory').subscribe(
        (r: any) => {
          console.log('Response from API:', r);
          this.subCategoryData = r.data;
        }
      );

    } catch (error) {
      console.error('An error occurred:', error);
      this.UI.SAY('An error occurred');
      this.loading = false;
    }
  }

  setFormValues(data: any): void {
    this.PRODFR.patchValue(data); 
  }

  SAVE() {
    this.loading = true; 
    try {
      if(this.isEdit == true){
        const url = `${ZXAPI.PRODUCT.VIEW}/${this.productId}`;
        this.loadWithLoader(this.MW.PUT(url, this.PRODFR.value), 'Error updating product').subscribe(
          (r: any) => {
            console.log('res', r)
            if (r.status == 200) {
              this.UI.toastAlertSuccess()
              this.SY.GOTO('product');
            } else {
              this.UI.SAY('Product could not be saved');
            }
          }
        );
      } else {
        this.loadWithLoader(this.MW.POST(ZXAPI.PRODUCT.VIEW, this.PRODFR.value), 'Error saving product').subscribe(
          (r: any) => {
            console.log('res', r)
            if (r.status == 200) {
              this.UI.toastAlertSuccess()
              this.SY.GOTO('product');
            } else {
              this.UI.SAY('Product could not be saved');
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

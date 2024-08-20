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
export class AddComponent {
  constructor(
    private AR: ActivatedRoute,
    private FB: FormBuilder,
    private MW: ZXDataService,
    public SY: ZXApplService,
    private UI: ZXUIService,) { SY.PAGE('NEW TESTIMONIAL'); }

  testimonials: any = [];
  isEdit: boolean = false;
  testimonialId: any;
  loading: boolean = false; // Flag to track loading state
  TESTIMONIALFR = this.FB.group({
    authorName: [, Validators.required],
    notes: [, Validators.required],
    showInUI: [],
    isActive: [true]
  });


  ngOnInit(): void {
    this.fetchData();
    this.SY.PAGE(this.isEdit ? 'EDIT TESTIMONIAL' : 'ADD TESTIMONIAL')
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const testimonialId = parseInt(params['testimonialId']);
        console.log(testimonialId)
        if (testimonialId) {
          this.testimonialId = testimonialId;
          this.isEdit = true;
          const url = `${ZXAPI.TESTIMONIAL.VIEW}/${testimonialId}`;
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
    this.TESTIMONIALFR.patchValue(data);
  }

  SAVE() {
    if (this.isEdit) {
      // let data = {
      //   name: this.testimonialIdFR.value.categoryName,
      // };
      const url = `${ZXAPI.TESTIMONIAL.VIEW}/${this.testimonialId}`;
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.PUT(url, this.TESTIMONIALFR.value), 'Error updating Testimonial').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('testimonial');
          } else {
            this.UI.SAY('Testimonial could not be saved');
          }
        }
      );
    } else {
      this.loading = true; // Start loading
      this.loadWithLoader(this.MW.POST(ZXAPI.TESTIMONIAL.VIEW, this.TESTIMONIALFR.value), 'Error saving Testimonial').subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.status == 200) {
            this.UI.toastAlertSuccess()
            this.SY.GOTO('testimonial');
          } else {
            this.UI.SAY('Testimonial could not be saved');
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

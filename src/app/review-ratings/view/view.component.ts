import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXAPI } from 'src/app/zxapi';
import { ZXUIService } from 'src/app/zxapp/zxui.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent  implements OnInit
{
  LH:any = {};
  loading: boolean = false;

  constructor(
    private AR:ActivatedRoute,
    private MW:ZXDataService,
    public SY:ZXApplService,
    private UI:ZXUIService
    ){SY.PAGE('REVIEWRATING DETAILS');}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        console.log('params:', params);
        const reviewId = parseInt(params['reviewId']);
        if (reviewId) {
          const url = `${ZXAPI.REVIEWRATING.VIEW}/${reviewId}`;
          this.MW.GET(url).subscribe(
            (response: any) => {
              console.log('Response:', response);
              this.LH = response.data;
            },
            (error: any) => {
              console.error('Error fetching data:', error);
              this.UI.SAY('Error fetching data');
            }
          ).add(() => this.loading = false); 
        } 
      });
    } catch (error) {
      console.error('An error occurred:', error);
      this.UI.SAY('An error occurred');
      this.loading = false; // Stop loading
    }
  }
    
  REMOVE(IT:any)
  {
    this.UI.CONFIRM('CONFIRM DELETE',` ${IT.reviewId} will be deleted. Are you sure ?`).subscribe(r=>{
      console.log('r',r)
      if(r>=100){
        this.DELETE(IT);
      } 
    })
  }
  
  DELETE (IT:any) {
    try {
      const url = `${ZXAPI.REVIEWRATING.VIEW}/${IT.reviewId}`;
      this.loading = true; // Start loading
      this.MW.DELETE(url).subscribe(
        (r: any) => {
          this.SY.BACK();
          this.loading = false; // Stop loading on success
        },
        (error: any) => {
          console.error('Error deleting review:', error);
          this.UI.SAY('Error deleting review');
          this.loading = false; // Stop loading on error
        }
      );
    } catch (error) {
      console.error('Error deleting Review:', error);
      this.UI.SAY('Error deleting Review');
      this.loading = false; // Stop loading on catch
    }
  }  
  APPROVED (IT:any) {
    try {
      const url = `${ZXAPI.REVIEWRATING.VIEW}/${IT.reviewId}/approve`;
      this.loading = true;
      this.MW.PUT(url,{isApproved: true}).subscribe(
        (r: any) => {
          this.UI.toastAlertSuccess();
          this.fetchData();
          this.loading = false; 
        },
        (error: any) => {
          console.error('Error approve review:', error);
          this.UI.SAY('Error approve review');
          this.loading = false; 
        }
      );
    } catch (error) {
      console.error('Error deleting Review:', error);
      this.UI.SAY('Error deleting Review');
      this.loading = false; 
    }
  }  
  
  EDIT(IT:any)
  {
    this.SY.OPEN('review/edit',IT.reviewId);
  }
}

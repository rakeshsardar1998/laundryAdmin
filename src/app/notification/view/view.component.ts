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
  loading: boolean = false; // Flag to track loading state
  notificationId: number | undefined;
  constructor(
    private AR:ActivatedRoute,
    private MW:ZXDataService,
    public SY:ZXApplService,
    private UI:ZXUIService
    ){SY.PAGE('NOTIFICATION DETAILS');}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const notificationId = parseInt(params['notificationId']);
        if (notificationId) {
          const url = `${ZXAPI.NOTIFICATION.VIEW}/${notificationId}`;
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
    this.UI.CONFIRM('CONFIRM DELETE',` ${IT.notificationId} will be deleted. Are you sure ?`).subscribe(r=>{
      console.log('r',r)
      if(r>=100){
        this.DELETE(IT);
      } 
    })
  }
  
  DELETE (IT:any) {
    try {
      const url = `${ZXAPI.NOTIFICATION.VIEW}/${IT.notificationId}`;
      this.loading = true; // Start loading
      this.MW.DELETE(url).subscribe(
        (r: any) => {
          this.SY.BACK();
          this.loading = false; // Stop loading on success
        },
        (error: any) => {
          console.error('Error deleting Notification:', error);
          this.UI.SAY('Error deleting Notification');
          this.loading = false; // Stop loading on error
        }
      );
    } catch (error) {
      console.error('Error deleting Notification:', error);
      this.UI.SAY('Error deleting Notification');
      this.loading = false; // Stop loading on catch
    }
  }  
  
  EDIT(IT:any)
  {
    this.SY.OPEN('notification/edit',IT.notificationId);
  }
}
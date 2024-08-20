import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXAPI } from 'src/app/zxapi';
import { ZXUIService } from 'src/app/zxapp/zxui.service';

@Component({
  selector: 'loca-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class UserViewComponent  implements OnInit
{
  LH:any = {};
  loading: boolean = false; // Flag to track loading state

  constructor(
    private AR:ActivatedRoute,
    private MW:ZXDataService,
    public SY:ZXApplService,
    private UI:ZXUIService
    ){SY.PAGE('USER');}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        console.log('params:', params);
        const userId = parseInt(params['userId']);
        if (userId) {
          const url = `${ZXAPI.PPLE.VIEW}/${userId}/profile`;
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
    this.UI.CONFIRM('CONFIRM DELETE',` ${IT.userId} will be deleted. Are you sure ?`).subscribe(r=>{
      console.log('r',r)
      if(r>=100){
        this.DELETE(IT);
      } 
    })
  }
  
  DELETE (IT:any) {
    try {
      const url = `${ZXAPI.PPLE.VIEW}/${IT.userId}/delete`;
      this.loading = true; // Start loading
      this.MW.DELETE(url).subscribe(
        (r: any) => {
          this.SY.BACK();
          this.loading = false; // Stop loading on success
        },
        (error: any) => {
          console.error('Error deleting user:', error);
          this.UI.SAY('Error deleting user');
          this.loading = false; // Stop loading on error
        }
      );
    } catch (error) {
      console.error('Error deleting user:', error);
      this.UI.SAY('Error deleting user');
      this.loading = false; // Stop loading on catch
    }
  }  
  
  EDIT(IT:any)
  {
    this.SY.OPEN('user/edit',IT.userId);
  }
}

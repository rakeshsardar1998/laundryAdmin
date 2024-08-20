import { Component,OnInit } from '@angular/core';
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

  constructor(
    private AR:ActivatedRoute,
    private MW:ZXDataService,
    public SY:ZXApplService,
    private UI:ZXUIService
    ){SY.PAGE('CONTACTUS DETAILS');}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const contactUsId = parseInt(params['contactUsId']);
        if (contactUsId) {
          const url = `${ZXAPI.CONTACT.VIEW}/${contactUsId}`;
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
    this.UI.CONFIRM('CONFIRM DELETE',` ${IT.contactUsId} will be deleted. Are you sure ?`).subscribe(r=>{
      console.log('r',r)
      if(r>=100){
        this.DELETE(IT);
      } 
    })
  }
  
  DELETE (IT:any) {
    const url = `${ZXAPI.CONTACT.VIEW}/${IT.contactUsId}`;
    this.loading = true; 
  
    try {
      this.MW.DELETE(url).subscribe(
        (r: any) => {
          this.SY.BACK();
        },
        (error: any) => {
          this.UI.SAY('Error deleting contact us');
        }
      ).add(() => {
        this.loading = false; 
      });
    } catch (error) {
      this.UI.SAY('Error deleting contact us');
      this.loading = false; // Stop loading
    }
  }
  
  
  // EDIT(IT:any)
  // {
  //   this.SY.OPEN('contact-us/edit',IT.contactUsId);
  // }
}

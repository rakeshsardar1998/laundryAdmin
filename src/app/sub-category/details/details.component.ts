import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXAPI } from 'src/app/zxapi';
import { ZXUIService } from 'src/app/zxapp/zxui.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit
{
  LH:any = {};
  loading: boolean = false; // Flag to track loading state

  constructor(
    private AR:ActivatedRoute,
    private MW:ZXDataService,
    public SY:ZXApplService,
    private UI:ZXUIService
    ){SY.PAGE('SUBCATEGORY DETAILS');}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const subCategoryId = parseInt(params['subCategoryId']);
        if (subCategoryId) {
          const url = `${ZXAPI.SUBCATEGORY.VIEW}/${subCategoryId}`;
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
      this.loading = false;
    }
  }
    
  REMOVE(IT:any)
  {
    this.UI.CONFIRM('CONFIRM DELETE',` ${IT.subCategoryId} will be deleted. Are you sure ?`).subscribe(r=>{
      console.log('r',r)
      if(r>=100){
        this.DELETE(IT);
      } 
    })
  }
  
  DELETE (IT:any)
  {
    const url = `${ZXAPI.SUBCATEGORY.VIEW}/${IT.subCategoryId}`
    this.loading = true; // Start loading
    this.MW.DELETE(url).subscribe(
      (r: any) => {
        this.SY.BACK();
      },
      (error: any) => {
        console.error('Error deleting subCategory:', error);
        this.UI.SAY('Error deleting subCategory');
        this.loading = false; // Stop loading
      }
    );
  }
  
  EDIT(IT:any)
  {
    this.SY.OPEN('sub-category/edit',IT.subCategoryId);
  }
}

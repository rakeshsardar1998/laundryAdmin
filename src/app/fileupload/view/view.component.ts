import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXAPI } from 'src/app/zxapi';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit
{
  LH:any = {};
  loading: boolean = false; // Flag to track loading state
  fileId: number | undefined;
  linkCopied: boolean = false;
  constructor(
    private AR:ActivatedRoute,
    private MW:ZXDataService,
    public SY:ZXApplService,
    private UI:ZXUIService,
    private clipboard: Clipboard
    ){SY.PAGE('FILEUPLOAD DETAILS');}

  ngOnInit(): void {
    this.fetchData();
  }

  copyLink(link: string): void {
    this.clipboard.copy(link);
    this.linkCopied = true;

    setTimeout(() => {
        this.linkCopied = false;
    }, 1000);
  }

  fetchData(): void {
    this.loading = true;
    try {
      this.AR.params.subscribe(params => {
        const fileId = parseInt(params['fileId']);
        if (fileId) {
          const url = `${ZXAPI.FILEUPLOAD.VIEW}/${fileId}`;
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
    this.UI.CONFIRM('CONFIRM DELETE',` ${IT.fileId} will be deleted. Are you sure ?`).subscribe(r=>{
      console.log('r',r)
      if(r>=100){
        this.DELETE(IT);
      } 
    })
  }
  
  DELETE (IT:any) {
    try {
      const url = `${ZXAPI.FILEUPLOAD.VIEW}/${IT.fileId}`;
      this.loading = true; // Start loading
      this.MW.DELETE(url).subscribe(
        (r: any) => {
          this.SY.BACK();
          this.loading = false; // Stop loading on success
        },
        (error: any) => {
          console.error('Error deleting fileupload:', error);
          this.UI.SAY('Error deleting fileupload');
          this.loading = false; // Stop loading on error
        }
      );
    } catch (error) {
      console.error('Error deleting fileupload:', error);
      this.UI.SAY('Error deleting fileupload');
      this.loading = false; // Stop loading on catch
    }
  } 
}


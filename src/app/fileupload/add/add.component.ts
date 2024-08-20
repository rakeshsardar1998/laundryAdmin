import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { ZXAPI } from 'src/app/zxapi';
import { FileUploadModalComponent } from '../file-upload-modal/file-upload-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  selectedFile: File | null = null;
  isActive = true;
  isEdit = false;
  fileId: any;
  loading = false; // Flag to track loading state

  constructor(
    private http: HttpClient,
    private AR: ActivatedRoute,
    private MW: ZXDataService,
    public SY: ZXApplService,
    private UI: ZXUIService,
    private dialog: MatDialog
  ) {
    SY.PAGE('ADD FILE');
  }

  ngOnInit(): void {
    this.fetchData();
    // this.SY.PAGE(this.isEdit ? 'EDIT FILE' : 'ADD FILE');
  }

  fetchData(): void {
    this.loading = true; // Start loading
    try {
      this.AR.params.subscribe(params => {
        const fileId = parseInt(params['fileId'], 10);
        if (fileId) {
          this.fileId = fileId;
          this.isEdit = true;
          const url = `${ZXAPI.FILEUPLOAD.VIEW}/${fileId}`;
          this.loadWithLoader(this.MW.GET(url), 'Error fetching data').subscribe(
            (response: any) => {
              console.log('Response:', response);
              // Assuming you have properties like filename and isActive
              this.selectedFile = response.data.filename;
              this.isActive = response.data.isActive;
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
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  SAVE(): void {
    if (this.selectedFile) {
      console.log(this.selectedFile)
      this.loading = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('isActive', this.isActive.toString());

      let url = `${ZXAPI.FILEUPLOAD.VIEW}/upload`;
      this.MW.POST(url, formData).subscribe(
        (r: any) => {
          console.log('res', r);
          if (r.success === true) {
            this.openModal(r.file.fileurl);
            // this.SY.GOTO('fileupload');
            this.UI.toastAlertSuccess()
          } else {
            this.UI.SAY('File could not be saved');
          }
        },
        (error: any) => {
          console.error('Error saving File', error);
          this.UI.SAY('Error saving File');
          this.loading = false;
        },
        () => {
          this.loading = false; // Stop loading
        }
      );
    }
  }

  loadWithLoader(apiCall: any, errorMessage: string): Observable<any> {
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
          this.loading = false;
          observer.complete();
        }
      );
    });
  }

  openModal(fileUrl: string): void {
    const dialogRef = this.dialog.open(FileUploadModalComponent, {
      width: '400px',
      data: { fileUrl } // Pass file URL to modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
 
}
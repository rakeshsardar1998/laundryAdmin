import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZXAPI } from 'src/app/zxapi';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';

@Component({
  selector: 'app-change-order-modal',
  templateUrl: './change-order-modal.component.html',
  styleUrls: ['./change-order-modal.component.css']
})
export class ChangeOrderModalComponent implements OnInit {
  @Output() orderStatusChanged = new EventEmitter<void>();
  previousOrderStatuses: any

  constructor(
    private MW: ZXDataService,
    private FB: FormBuilder,
    private UI: ZXUIService,
    private dialogRef: MatDialogRef<ChangeOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.previousOrderStatuses = data.orderStatusId
  }

  loading: boolean = false;

  FR = this.FB.group({
    orderStatusId: [, Validators.required],
    notes: []
  });

  DATA: any = [];

  closeModal() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.fetchData();
    this.setFormValues(this.data.status);
  }

  fetchData(): void {
    this.loading = true;
    this.MW.GET(ZXAPI.ORDER.DD).subscribe(
      (response: any) => {
        console.log('Response from API:', response);
        this.DATA = response.data;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    );
  }

  setFormValues(data: any): void {
    this.FR.patchValue(data);
  }

  SAVE() {
    console.log(this.FR.value);
    try {
      const url = `${ZXAPI.ORDER.VIEW}/${this.data.orderId}/updateorderstatus`;
      this.MW.PUT(url, this.FR.value).subscribe((res: any) => {
        this.UI.toastAlertSuccess()
        this.closeModal();
        this.orderStatusChanged.emit();
      });
    } catch (err) {

    }
  }
}

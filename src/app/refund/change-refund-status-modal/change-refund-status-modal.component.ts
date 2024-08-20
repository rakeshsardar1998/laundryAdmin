import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZXAPI } from 'src/app/zxapi';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';

@Component({
  selector: 'app-change-refund-status-modal',
  templateUrl: './change-refund-status-modal.component.html',
  styleUrls: ['./change-refund-status-modal.component.css']
})
export class ChangeRefundStatusModalComponent implements OnInit {
  @Output() refundStatusChanged = new EventEmitter<void>();
  previousRefundStatuses: any

  constructor(
    private MW: ZXDataService,
    private FB: FormBuilder,
    private UI: ZXUIService,
    private dialogRef: MatDialogRef<ChangeRefundStatusModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.previousRefundStatuses = data.refundStatusId
  }

  loading: boolean = false;

  FR = this.FB.group({
    refundStatusId: [, Validators.required],
    adminNotes: []
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
    this.MW.GET(ZXAPI.REFUND.DD).subscribe(
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
      const url = `${ZXAPI.REFUND.VIEW}/${this.data.refundId}/changeStatus`;
      this.MW.PUT(url, this.FR.value).subscribe((res: any) => {
        this.UI.toastAlertSuccess()
        this.closeModal();
        this.refundStatusChanged.emit();
      });
    } catch (err) {

    }
  }
}

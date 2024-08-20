import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.css']
})
export class FileUploadModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FileUploadModalComponent>,
    private clipboard: Clipboard
  ) {
    console.log(data)
  }

  copyLink(link: string): void {
    this.clipboard.copy(link);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

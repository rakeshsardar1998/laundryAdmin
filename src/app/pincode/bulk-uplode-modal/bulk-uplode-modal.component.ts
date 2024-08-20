import { Component,OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { ZXAPI } from 'src/app/zxapi';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-bulk-uplode-modal',
  templateUrl: './bulk-uplode-modal.component.html',
  styleUrls: ['./bulk-uplode-modal.component.css']
})
export class BulkUplodeModalComponent {
  constructor(private dialogRef: MatDialogRef<BulkUplodeModalComponent>){}

    isEdit: boolean = false;
  closeModal(): void {
    this.dialogRef.close();
  }

}

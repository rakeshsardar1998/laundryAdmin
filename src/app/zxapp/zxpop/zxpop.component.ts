import { Component,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface POPUP_DEF
{
  HEAD:string;
  BODY:string;
  BUTN:number;
}

@Component({
  selector: 'zx-popup',
  templateUrl: './zxpop.component.html',
  styleUrls: ['./zxpop.component.css']
})
export class ZXPopComponent 
{
  constructor(
    public dialogRef: MatDialogRef<ZXPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: POPUP_DEF,
  ) {}
}

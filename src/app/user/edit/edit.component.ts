import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators }  from '@angular/forms';

import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { ZXAPI } from 'src/app/zxapi';

@Component({
  selector: 'loca-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class USerEditComponent implements OnInit {

  USRFR = this.FB.group({
    USRNR: ['', Validators.required],
    USRNM: ['', Validators.required],
    EMAIL: ['', Validators.required],
    PHONE: ['', Validators.required],
    DEPID: ['', Validators.required],
    DESIG: ['', Validators.required]
  });
  constructor(
    private AR:ActivatedRoute,
    private FB:FormBuilder,
    private MW:ZXDataService,
    public SY:ZXApplService,
    private UI:ZXUIService){SY.PAGE('EDIT USER');}

  ngOnInit(): void {
    this.AR.params.subscribe(parm => {
      this.MW.POST(ZXAPI.PPLE.VIEW,{USRNR:parm['USRNR']}).subscribe(data=>{this.USRFR.setValue(data);});
    })
  }
  SAVE()
  {
    this.MW.POST(ZXAPI.PPLE.VIEW,this.USRFR.value).subscribe(r=>{
      if(r.STATU >= 100) this.SY.BACK();
      else this.UI.SAY('User could not be saved');
    })
  }
}

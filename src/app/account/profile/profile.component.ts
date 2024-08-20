import { Component } from '@angular/core';
import { FormBuilder, Validators }  from '@angular/forms';

import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { ZXAPI } from 'src/app/zxapi';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(

    private FB:FormBuilder,
    private MW:ZXDataService,
    public SY:ZXApplService,
    private UI:ZXUIService){SY.PAGE('NEW USER');}

    USRFR = this.FB.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      roleId: ['', Validators.required]
    });

    SAVE()
    {
    this.MW.PUT(ZXAPI.PPLE.VIEW,this.USRFR.value).subscribe(r=>{
      if(r.STATU >= 100) this.SY.GOTO('user');
      else this.UI.SAY('Location could not be saved');
    })
  }
}

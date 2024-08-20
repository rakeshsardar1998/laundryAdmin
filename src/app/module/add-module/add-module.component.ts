import { Component } from '@angular/core';
import { FormBuilder, Validators }  from '@angular/forms';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXUIService } from 'src/app/zxapp/zxui.service';
import { ZXAPI } from 'src/app/zxapi';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent {

  constructor(

    private FB:FormBuilder,
    private MW:ZXDataService,
    public SY:ZXApplService,
    private UI:ZXUIService){SY.PAGE('NEW USER');}

    USRFR = this.FB.group({
      moduleId: ['', Validators.required],
      moduleName: ['', Validators.required],
      serial: ['', Validators.required],
      isActive: ['', Validators.required]
    });

    SAVE()
    {
      
    this.MW.PUT(ZXAPI.PPLE.SAVE,this.USRFR.value).subscribe(r=>{
      if(r.STATU >= 100) this.SY.GOTO('user');
      else this.UI.SAY('Location could not be saved');
    })
    this.MW.PUT(ZXAPI.PPLE.SAVE,this.USRFR.value).subscribe(r=>{
      if(r.STATU >= 100) this.SY.GOTO('user');
      else this.UI.SAY('Location could not be saved');
    })
  }
}

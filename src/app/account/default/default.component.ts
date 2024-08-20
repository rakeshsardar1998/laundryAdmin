import { Component } from '@angular/core';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent 
{
  constructor(private ME:ZXApplService){ME.PAGE('WIP');}
}

import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXAPI } from 'src/app/zxapi';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent {

  COLS = [{ ID: 'moduleId', TX: 'Module Id' }, { ID: 'moduleName', TX: 'Module Name' },{ ID: 'serial', TX: 'Serial' }, { ID: 'isActive', TX: 'Status' }

  ];
  SELC: string[] = [];
  DATA = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private SY: ZXApplService, private MW: ZXDataService) {
    SY.PAGE('Module');
    this.SELC = this.COLS.map(a => a.ID);

  }
  ngAfterViewInit(): void {
    this.MW.POST(ZXAPI.ROLE.LIST, {}).subscribe(r => {
      this.DATA = new MatTableDataSource(r);
      this.DATA.sort = this.sort;
      this.DATA.paginator = this.paginator;
    });
  }
  FILTER(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DATA.filter = filterValue.trim().toLowerCase();
  }
  ITEM(IT: any) {
    this.SY.OPEN('module/view', IT.moduleId);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXAPI } from 'src/app/zxapi';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class UserComponent implements OnInit {
  COLS = [{ ID: 'name', TX: 'Name' }, { ID: 'phone', TX: 'Phone' }, { ID: 'email', TX: 'Email' }, { ID: 'roleName', TX: 'Role' },
  { ID: 'isActive', TX: 'IsActive' }, { ID: 'isDeleted', TX: 'IsDeleted' }];
  SELC: string[] = [];
  DATA = new MatTableDataSource([]);
  loading = false;

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private SY: ZXApplService, private MW: ZXDataService) {
    SY.PAGE('USERS');
    this.SELC = this.COLS.map(a => a.ID);
  }

  ngOnInit(): void {
    this.fetchData();
  }
  replace(){
    this.fetchData();
  }
  fetchData(): void {
    this.loading = true;

    this.MW.GET(ZXAPI.PPLE.LIST).subscribe(
      (r: any) => {
        console.log('Response from API:', r);
        this.DATA = new MatTableDataSource(r.data);
        this.DATA.sort = this.sort;
        this.DATA.paginator = this.paginator;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    );
  }


  FILTER(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DATA.filter = filterValue.trim().toLowerCase();
  }

  ITEM(IT: any): void {
    console.log(IT.roleId)
    this.SY.OPEN('user/view', IT.userId);
  }

  getValue(columnId: string, element: any): string {
    console.log('element',columnId)
    if (columnId === 'isActive' || columnId === 'isDeleted') {
      return element[columnId] ? 'Yes' : 'No';
    }
    return element[columnId] ? element[columnId] : 'N/A';
  }
  
  getColor(columnId: string, element: any): string {
    if (columnId === 'isDeleted') {
      return element[columnId] ? 'red' : 'green';
    } else if (columnId === 'isActive') {
      return element[columnId] ? 'green' : 'red';
    }
    return '';
  }
}

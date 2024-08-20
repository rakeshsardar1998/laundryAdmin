import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXAPI } from 'src/app/zxapi';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  COLS = [{ ID: 'orderId', TX: 'Order Id' }, { ID: 'phone', TX: 'Phone' },
  { ID: 'refundStatus', TX: 'Refund Status' }, { ID: 'createdAt', TX: 'Created At' }];
  SELC: string[] = [];
  DATA = new MatTableDataSource([]);
  loading = false;

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private SY: ZXApplService, private MW: ZXDataService,private dialog: MatDialog, private datePipe: DatePipe) {
    SY.PAGE('REFUND');
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
    this.MW.GET(ZXAPI.REFUND.LIST).subscribe(
      (response: any) => {
        console.log('Response from API:', response);
        this.DATA = new MatTableDataSource(response.data);
        console.log(this.DATA)
        this.DATA.sort = this.sort;
        this.DATA.paginator = this.paginator;
        this.loading = false; // Stop loading on success
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.loading = false; // Stop loading on error
      }
    );
  }


  FILTER(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DATA.filter = filterValue.trim().toLowerCase();
  }

  ITEM(IT: any): void {
    this.SY.OPEN('refund/view', IT.refundId);
  }

  getValue(columnId: string, element: any): string {
    if (columnId === 'refundStatus') {
      return element.refundStatus?.refundStatusName || 'N/A';
    } if (columnId === 'createdAt') {
      const createdAtValue = element.createdAt;
      return createdAtValue ? this.datePipe.transform(createdAtValue, 'short') ?? 'N/A' : 'N/A';
    }
    return element[columnId] ? element[columnId] : 'N/A';
    
  }
  
  // getColor(columnId: string, element: any): string {
  //  if (columnId === 'refundStatus') {
  //     return element[columnId] ? 'green' : 'red';
  //   }
  //   return '';
  // }
}

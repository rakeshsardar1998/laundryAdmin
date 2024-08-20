import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXAPI } from 'src/app/zxapi';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  COLS = [
    { ID: 'orderId', TX: 'ORDER ID' },
    { ID: 'name', TX: 'ORDER BY' },
    { ID: 'createdAt', TX: 'ORDER AT' },
    { ID: 'date', TX: 'PICKUP DATE' },
    { ID: 'totalPayableAmount', TX: 'AMOUNT' },
    { ID: 'statusName', TX: 'ORDER STATUS' },
  ];
  SELC: string[] = [];
  DATA = new MatTableDataSource([]);
  data: any = [];
  loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;

  constructor(private SY: ZXApplService, private MW: ZXDataService, private datePipe: DatePipe) {
    SY.PAGE('ORDERS');
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
    this.MW.GET(ZXAPI.ORDER.DD).subscribe(
      (response: any) => {
        console.log('Response from API:', response);
        this.data = response.data;
        if (this.data.length > 0) {
          this.ORDERLISTS(this.data[0].orderStatusId);
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    );
  }

  ORDERLISTS(orderStatusId: any): void {
    const url = `${ZXAPI.ORDER.LIST}/${orderStatusId}/filterorder`;
    this.loading = true;
    this.MW.GET(url).subscribe(
      (response: any) => {
        console.log('Response from API:', response);
        this.DATA = new MatTableDataSource(response.data);
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
    this.SY.OPEN('orders/view', IT.orderId);
  }

  getValue(columnId: string, element: any): string {
    if (columnId === 'date') {
      const dateValue = element.pickupSlots?.date;
      const dayValue = element.pickupSlots?.slot?.day;
      const timeValue = element.pickupSlots?.slot?.time;
        return timeValue ? `${dateValue}  ${dayValue}  ${timeValue}` : 'N/A';
    }
    if (columnId === 'name') {
      return element.user?.name || 'N/A';
    }
    if (columnId === 'statusName') {
      return element.status?.statusName || 'N/A';
    }
    if (columnId === 'createdAt') {
      const createdAtValue = element.createdAt;
      return createdAtValue ? this.datePipe.transform(createdAtValue, 'short') ?? 'N/A' : 'N/A';
    }
    return element[columnId] ? element[columnId] : 'N/A';
  }

  onTabChange(event: any): void {
    const orderStatusId = this.data[event.index].orderStatusId;
    this.ORDERLISTS(orderStatusId);
  }
}

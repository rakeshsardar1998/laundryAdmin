import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXAPI } from 'src/app/zxapi';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  COLS = [{ ID: 'couponTypeName', TX: 'Coupon Type' }, { ID: 'couponCode', TX: 'Coupon Code' }, { ID: 'discountType', TX: 'Discount Type' },{ ID: 'discountAmount', TX: 'Discount Amount' },{ ID: 'minOrderAmount', TX: 'Minimum Order Amount' },
  { ID: 'isActive', TX: 'IsActive' }, { ID: 'isDeleted', TX: 'IsDeleted' }];
  SELC: string[] = [];
  DATA = new MatTableDataSource([]);
  loading = false;

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private SY: ZXApplService, private MW: ZXDataService) {
    SY.PAGE('COUPONS');
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
    this.MW.GET(ZXAPI.COUPON.LIST).subscribe(
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
    this.SY.OPEN('coupon/view', IT.couponId);
  }

  getValue(columnId: string, element: any): string {
    console.log('columnId', columnId)
    if (columnId === 'isActive' || columnId === 'isDeleted') {
      return element[columnId] ? 'Yes' : 'No';
    }
    if (columnId === 'couponTypeName') {
      return element.couponType?.couponTypeName || 'N/A'
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

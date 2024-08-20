import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';
import { ZXAPI } from 'src/app/zxapi';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  COLS = [
    { ID: 'productName', TX: 'Product'},
    { ID: 'name', TX: 'AddedBy'},
    { ID: 'reviews', TX: 'Reviews' },
    { ID: 'ratings', TX: 'Ratings' },
    { ID: 'createdAt', TX: 'CreatedAt' },
    { ID: 'isApproved', TX: 'IsApproved' },
    { ID: 'isActive', TX: 'IsActive' },
    { ID: 'isDeleted', TX: 'IsDeleted' }
  ];
  SELC: string[] = [];
  DATA = new MatTableDataSource([]);
  loading = false;

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private SY: ZXApplService, private MW: ZXDataService, private datePipe: DatePipe) {
    SY.PAGE('REVIEWRATINGS');
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
    this.MW.GET(ZXAPI.REVIEWRATING.LIST).subscribe(
      (response: any) => {
        console.log('Response from API:', response);
        this.DATA = new MatTableDataSource(response.data);
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
    this.SY.OPEN('review/view', IT.reviewId);
  }

  getValue(columnId: string, element: any): string {
    if (columnId === 'isActive' || columnId === 'isDeleted' || columnId === 'isApproved') {
      return element[columnId] ? 'Yes' : 'No';
    }
    if (columnId === 'productName') {
      return element.product?.productName || 'N/A';
    }
    if (columnId === 'name') {
      return element.addedUser?.name || 'N/A';
    }
    if (columnId === 'createdAt') {
      const createdAtValue = element.createdAt;
      return createdAtValue ? this.datePipe.transform(createdAtValue, 'short') ?? 'N/A' : 'N/A';
    }
    return element[columnId] ? element[columnId] : 'N/A';
  }

  getColor(columnId: string, element: any): string {
    if (columnId === 'isDeleted') {
      return element[columnId] ? 'red' : 'green';
    } else if (columnId === 'isActive' || columnId === 'isApproved') {
      return element[columnId] ? 'green' : 'red';
    }
    return '';
  }
}

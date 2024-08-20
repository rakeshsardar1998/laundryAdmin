import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ZXAPI } from 'src/app/zxapi';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';

@Component({
  selector: 'app-available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.css']
})
export class AvailableSlotsComponent {
  COLS = [{ ID: 'day', TX: 'Day' },{ ID: 'slotId', TX: 'SlotId' }, { ID: 'time', TX: 'Time' }, { ID: 'slotLimit', TX: 'SlotLimit' },{ ID: 'usedCount', TX: 'Used Count' },
  { ID: 'isActive', TX: 'IsActive' }, { ID: 'isDeleted', TX: 'IsDeleted' }
  ];

  constructor(private SY: ZXApplService, private MW: ZXDataService,
    private dialogRef: MatDialogRef<AvailableSlotsComponent>) {
    SY.PAGE('SLOTS');
    this.SELC = this.COLS.map(a => a.ID);
  }

  SELC: string[] = [];
  loading = false;
  data: any = [];

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(): void {
    this.loading = true;
    this.MW.GET(ZXAPI.SLOT.MD).subscribe(
      (response: any) => {
        this.data = response.data
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    );
  }

  getValue(columnId: string, element: any): string {
    if (columnId === 'isActive' || columnId === 'isDeleted') {
      return element[columnId] ? 'Yes' : 'No';
    }
    if (columnId === 'usedCount') {
      return element[columnId] ? element[columnId] : 0;
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

  closeDialog(): void {
    this.dialogRef.close();
  }
}

import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ZXApplService } from './zxapp/zxappl.service';
import { ZXAPI, ZXNAV } from './zxapi';
import { AuthService } from './auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { ZXDataService } from './zxapp/zxdata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent implements OnInit,AfterViewInit {
  sideNavItems: any;
  loading = false;
  data: any;
  data1: any;
  constructor(public SY: ZXApplService, private BO: BreakpointObserver, private auth: AuthService, private RT: Router, private MW: ZXDataService) {
    this.BO.observe(Breakpoints.Handset).subscribe(res => { this.SY.GA.PHONE = res.matches; });
    if (SY.ISIN()) {
      console.log('hi...')
      const currentPage = localStorage.getItem('currentPage');
      if (currentPage) {
        SY.GOTO(currentPage);
      } else {
        this.navigateToHomePage();

      }
    } else {
      console.log('sdjhvbs...')
      SY.GOTO(ZXNAV.NOLOGIN);
    }
  }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  private navigateToHomePage() {
    const extras: NavigationExtras = { replaceUrl: true }; // Navigation extras to replace URL
    this.RT.navigate([ZXNAV.ONLOGIN], extras); // Navigate to the home page with extras
  }

  ngOnInit() {
    const currentPage = localStorage.getItem('currentPage');
    console.log('currentPage',currentPage)
    if(this.SY.ISIN()){
      this.fetchData()
    }
  }

  ngAfterViewInit(): void {
    // this.fetchData();
  }

  logout() {
    this.auth.logout();
  }

  SN_MODE(): MatDrawerMode {
    if (this.SY.GA.PHONE) return 'over';
    return 'side';
  }
  SN_OPEN(): boolean | undefined {
    if (!this.SY.ISIN()) return false;
    if (this.SY.GA.PHONE) return false;
    return true
  }
  SN_BUTN(): boolean {
    if (!this.SY.ISIN()) return false;
    if (!this.SY.GA.PHONE) return false;
    return true;
  }
  SN_VIEW(SNAV: MatSidenav) {
    SNAV.toggle();
  }
  viewProfile() {
    this.SY.GOTO('profile')
  }

  isOpen: boolean = false;
  isOpen2: boolean = false; 

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.isOpen2 = false; 
  }

  toggleDropdown2(): void {
    this.isOpen2 = !this.isOpen2;
    this.isOpen = false;
  }
  selectOption(): void {
    this.isOpen = true;
  }
  fetchData(): void {
    this.loading = true;
    this.MW.GET(ZXAPI.NOTIFICATION.LIST).subscribe(
      (response: any) => {
        this.data = response.data;
        console.log('data...',this.data);
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.loading = false; // Stop loading on error
      }
    );
    this.loading = true;
    this.MW.GET(ZXAPI.NOTIFICATION.NewOrder).subscribe(
      (response: any) => {
        this.data1 = response.data;
        console.log('data...',this.data);
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.loading = false; // Stop loading on error
      }
    );
  }
  ITEM(IT: any): void {
    console.log('Notification selected:', IT);
    const url = `${ZXAPI.NOTIFICATION.VIEW}/${IT.notificationId}`;
    // Mark the notification as read
    this.MW.PUT(url, { isRead: true }).subscribe(
      (res: any) => {
       if(res.status==200){
        this.fetchData();
       }
      },
      (error: any) => {
        console.error('Error marking notification as read:', error);
      }
    );
    if (IT.notificationFor=="order") {
      this.SY.OPEN('orders/view', IT.orderId);
    } 
  }
}
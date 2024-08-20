import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZXAPI } from 'src/app/zxapi';
import { ZXApplService } from 'src/app/zxapp/zxappl.service';
import { ZXDataService } from 'src/app/zxapp/zxdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  dashboardData: any = {};
  constructor(
    public ME: ZXApplService,
    private MW: ZXDataService,
    private router: Router
  ) {
    ME.PAGE('HOME');
  }

  ngOnInit(): void {
    if (this.router.url === '/home') {
      window.history.pushState(null, document.title, window.location.href);
      window.addEventListener('popstate', () => {
        window.history.pushState(null, document.title, window.location.href);
        console.log('Back button clicked, staying on the same page');
      });
    }
    this.fetchDashboard();
  }

  fetchDashboard(): void {
    this.loading = true;
    this.MW.GET(ZXAPI.DASHBOARD.VIEW).subscribe(
      (response: any) => {
        console.log('Dashboard Data:', response);
        this.dashboardData = response.data || {}; // Ensure response.data is not undefined
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching dashboard data:', error);
        this.loading = false;
      }
    );
  }

  navigateToOrdersList(): void {
    this.router.navigate(['/orders']);
  }
  navigetToProductList(): void{
    this.router.navigate(['/product']);
  }
  navigetToCustomerList(): void{
    this.router.navigate(['/customers']);
  }
  navigetToCategoryList(): void{
    this.router.navigate(['/category']);
  }
  navigetToSubCategoryList(): void{
    this.router.navigate(['/sub-category']);
  }
}

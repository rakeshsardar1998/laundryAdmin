import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  NAVID: string;
  NAVTX: string;
  NVICO: string;
  NVCOL: string;
  children?: MenuItem[];
}

interface CollapseState {
  [key: string]: boolean;
}

@Component({
  selector: 'zx-menu',
  templateUrl: './zxmenu.component.html',
  styleUrls: ['./zxmenu.component.css']
})
export class ZXMenuComponent {

  @Input() NAVID: any;

  menuItems: MenuItem[] = [
    {
      NAVID: 'home',
      NAVTX: 'Home',
      NVICO: 'home',
      NVCOL: 'primary',
    },
    {
      NAVID: 'role',
      NAVTX: 'Role',
      NVICO: 'personPinTwo',
      NVCOL: 'primary',
    },
    {
      NAVID: 'users',
      NAVTX: 'User',
      NVICO: 'people',
      NVCOL: 'primary',
      children: [
        { NAVID: 'user', NAVTX: 'Admin', NVICO: 'people', NVCOL: 'primary' },
        { NAVID: 'customers', NAVTX: 'Customers', NVICO: 'people', NVCOL: 'primary' }
      ]
    },
    // { NAVID: 'home', NAVTX: 'Home', NVICO: 'home', NVCOL: 'primary' },
    // { NAVID: 'role', NAVTX: 'Role', NVICO: 'personPinTwo', NVCOL: 'primary' },
    { NAVID: 'product', NAVTX: 'Product', NVICO: 'production_quantity_limits', NVCOL: 'primary' },
    { NAVID: 'delivery-charge', NAVTX: 'Delivery Charge', NVICO: ' local_shipping', NVCOL: 'primary' },
    { NAVID: 'coupon', NAVTX: 'Coupon', NVICO: 'local_activity', NVCOL: 'primary' },
    { NAVID: 'orders', NAVTX: 'Orders', NVICO: 'shopping', NVCOL: 'primary' },
    { NAVID: 'feedback', NAVTX: 'Feedback', NVICO: 'feedback', NVCOL: 'primary' },
    { NAVID: 'review', NAVTX: 'Review Ratings', NVICO: 'star', NVCOL: 'primary' },
    { NAVID: 'testimonials', NAVTX: 'Testimonials', NVICO: 'format_quote', NVCOL: 'primary' },
    { NAVID: 'contact-us', NAVTX: 'Contact Us', NVICO: 'contacts', NVCOL: 'primary' },
    { NAVID: 'fileupload', NAVTX: 'File Upload', NVICO: 'upload', NVCOL: 'primary' },
    { NAVID: 'notification', NAVTX: 'Notification', NVICO: 'notifications', NVCOL: 'primary' },
    { NAVID: 'refund', NAVTX: 'Refund', NVICO: 'money', NVCOL: 'primary' },
    {
      NAVID: 'settings',
      NAVTX: 'Settings',
      NVICO: 'settings',
      NVCOL: 'primary',
      children: [
        { NAVID: 'pincode', NAVTX: 'Pincode', NVICO: 'pin', NVCOL: 'primary' },
        { NAVID: 'banner', NAVTX: 'Banner', NVICO: 'image', NVCOL: 'primary' },
        { NAVID: 'category', NAVTX: 'Category', NVICO: 'category', NVCOL: 'primary' },
        { NAVID: 'sub-category', NAVTX: 'Sub Category', NVICO: 'category', NVCOL: 'primary' },
        { NAVID: 'slot', NAVTX: 'Slot', NVICO: 'task', NVCOL: 'primary' },
        {NAVID:'order-status',NAVTX:'Order Status',NVICO:'shopping',NVCOL:'primary'},
      ]
    },
  ];

  isCollapsed: CollapseState = {};

  constructor(private router: Router) {
    this.initializeCollapseState();
  }

  initializeCollapseState(): void {
    this.menuItems.forEach(item => {
      if (item.children) {
        this.isCollapsed[item.NAVID] = true; // Initialize each menu item with collapsed state
      }
    });
  }

  ONCLICK(menuItem?: MenuItem): void {
    if (this.NAVID.mode == 'over') {
      this.NAVID.close();
    }
    // Additional logic based on the clicked menuItem, if needed
  }

  toggleCollapse(menuItemId: string): void {
    // Toggle collapse state of the clicked menuItem
    if (this.isCollapsed[menuItemId] !== undefined) {
      this.isCollapsed[menuItemId] = !this.isCollapsed[menuItemId];
    }
  }  

  isActive(menuItem: MenuItem): boolean {
    // Implement your logic to determine if the menuItem is active
    // For example, you can compare the current route with the menuItem's NAVID
    return this.router.url === '/' + menuItem.NAVID;
}


}

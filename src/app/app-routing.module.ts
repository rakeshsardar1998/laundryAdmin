// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './zxapp/zxauth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./account/account.module').then(M => M.AccountModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(M => M.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(M => M.CustomersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'role',
    loadChildren: () => import('./role/role.module').then(M => M.RoleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(M => M.CategoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sub-category',
    loadChildren: () => import('./sub-category/sub-category.module').then(M => M.SubCategoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(M => M.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pincode',
    loadChildren: () => import('./pincode/pincode.module').then(M => M.PincodeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'slot',
    loadChildren: () => import('./slot/slot.module').then(M => M.SlotModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'banner',
    loadChildren: () => import('./banner/banner.module').then(M => M.BannerModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'delivery-charge',
    loadChildren: () => import('./delivery-charge/delivery-charge.module').then(M => M.DeliveryChargeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'coupon',
    loadChildren: () => import('./coupon/coupon.module').then(M => M.CouponModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'review',
    loadChildren: () => import('./review-ratings/review-ratings.module').then(M => M.ReviewRatingsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then(M => M.FeedbackModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then(M => M.ContactUsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(M => M.OrdersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'testimonials',
    loadChildren: () => import('./testimonials/testimonials.module').then(M => M.TestimonialsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'fileupload',
    loadChildren: () => import('./fileupload/fileupload.module').then(M => M.FileuploadModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(M => M.NotificationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'order-status',
    loadChildren: () => import('./order-status/order-status.module').then(M => M.OrderStatusModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'refund',
    loadChildren: () => import('./refund/refund.module').then(M => M.RefundModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

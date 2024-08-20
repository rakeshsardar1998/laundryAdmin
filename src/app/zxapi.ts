export const ZXAPI =
{
    USER:{LOGIN:'/login'},
    DASHBOARD:{VIEW:'/dashboard'},
    PPLE:{LIST:'/users',VIEW:`/user`,CM:`/customers`},
    ROLE:{LIST:'/roles',VIEW:'/role', DD:'/roles/dd'},
    CATEGORY:{LIST:'/categories',VIEW:`/category`,DD:'/categories/dd'},
    SUBCATEGORY:{LIST:'/subcategories',VIEW:`/subcategory`,DD:'/subcategories/dd'},
    PRODUCT:{LIST:'/products',VIEW:`/product`},
    PINCODE:{LIST:'/pincodes',VIEW:`/pincode`},
    SLOT:{LIST:'/slots',VIEW:`/slot`,MD:'/getavailableslots'},
    ORDER:{LIST:'/order',VIEW:`/order`, ORDERSTATUS:'/orderstatuses', DD:'/orderstatuses/dd'},
    DELIVARY:{LIST:'/deliverycharges',VIEW:`/deliverycharge`, DD:'/deliverychargetypes/dd'},
    COUPON:{LIST:'/coupons',VIEW:`/coupon`, DD:'/coupontypes/dd'},
    BANNER:{LIST:'/banners',VIEW:`/banner`},
    REVIEWRATING:{LIST:'/reviewratings',VIEW:`/reviewrating`},
    FEEDBACK:{LIST:'/feedbacks',VIEW:`/feedback`},
    CONTACT:{LIST:'/contactUses',VIEW:`/contactUs`},
    TESTIMONIAL:{LIST:'/testimonials',VIEW:`/testimonial`},
    FILEUPLOAD:{LIST:'/file/getall',VIEW:`/file`},
    NOTIFICATION:{LIST:'/notifications',VIEW:`/notification`,NewOrder:'/notificationForNewOrder'},
    ORDERSTATUS:{LIST:'/orderstatuses',VIEW:`/orderstatus`},
    REFUND:{LIST:'/refunds',VIEW:`/refund`,DD:`/refundStatuses`},

}
export const ZXNAV =
{
    ONLOGIN:'home',
    NOLOGIN:'login',
}

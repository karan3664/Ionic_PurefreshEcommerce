import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.page.html',
  styleUrls: ['./view-invoice.page.scss'],
})
export class ViewInvoicePage implements OnInit {
  user_id: '';
  Data: any;
  DATA: any;
  CartItems: any;
  orderid = "";
  OrderID = "";
  PaymentType = "";
  DeliveryStatus = "";
  name = "";
  mobile = "";
  email = "";
  pincode = "";
  address = "";
  city = "";
  state = "";
  lang_mark = "";
  total_qty: any;
  total_price = "";
  shipping_charge = "";
  Total = 0;
  package_id: null
  showData = false;
  discount_price = 0;
  extra_discount_price = 0;
  sowsD = false;
  DiscountValue = 0;
  ExtraDiscountValue = 0;
  EDV = 0;
  V1 = 0;
  V2 = 0;
  V3 = 0;
  V4 = 0;
  V5 = 0;
  V6 = 0;
  V7 = 0;
  extra_discount_type: any;
  SubTotalPrice = 0;
  ShippingCharge = 0;
  // Total = 0;
  total_tax: any;
  constructor(private route: ActivatedRoute,
    private modalController: ModalController,
    public alertController: AlertController,
    public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    private storageService: StorageService) {

    this.orderid = localStorage.getItem('myorderid');

    this.ViewOrder();



  }

  ngOnInit() {
  }






  ViewOrder() {




    this.loader.loadingPresent();

    this.authService.ViewOrder(this.orderid).subscribe(
      (res: any) => {
        console.log(res);

        if (res.error === false) {
          this.loader.loadingDismiss();

          this.Data = res.result_ViewOrder.sales_detail;
          this.CartItems = res.result_ViewOrder;
          this.OrderID = res.result_ViewOrder.sales_header.id;
          this.PaymentType = res.result_ViewOrder.sales_header.payment_type;
          this.DeliveryStatus = res.result_ViewOrder.sales_header.delivety_status;
          this.total_qty = res.result_ViewOrder.sales_detail;
          this.SubTotalPrice = res.result_ViewOrder.sales_header.total_price;
          this.DiscountValue = res.result_ViewOrder.sales_header.discount_price;
          this.EDV = res.result_ViewOrder.sales_header.extra_discount_price;
          this.ShippingCharge = res.result_ViewOrder.sales_header.shipping_charge;
          if (res.result_ViewOrder.sales_header.total_tax !== null) {
            this.total_tax = res.result_ViewOrder.sales_header.total_tax;

          }
          else {
            this.total_tax = '0'
          }
          this.name = res.result_ViewOrder.shipping_info.name;
          this.mobile = res.result_ViewOrder.shipping_info.mobile;
          this.email = res.result_ViewOrder.shipping_info.email;
          this.address = res.result_ViewOrder.shipping_info.address;
          this.lang_mark = res.result_ViewOrder.shipping_info.lang_mark;
          this.city = res.result_ViewOrder.shipping_info.city;
          this.state = res.result_ViewOrder.shipping_info.state;
          this.pincode = res.result_ViewOrder.shipping_info.pincode;



          // this.ExtraDiscountValue = res.result_ViewOrder.sales_header.extra_discount;
          // this.DiscountValue = res.result_ViewOrder.sales_header.discount_price;
          // this.extra_discount_type = res.rresult_ViewOrder.sales_header.extra_discount_type;
          // for (let i = 0; i < res.result_ViewOrder.sales_header.length; i++) {
          // this.SubTotalPrice += Number(res.result_ViewOrder.sales_header[i].total_price);
          // this.price = this.Data[i].product_packages[i].price;
          // }


          this.V1 = this.SubTotalPrice;
          this.V2 = this.ShippingCharge;


          if (this.DiscountValue != null) {
            this.V4 = this.DiscountValue;
          }
          else {
            this.V4 = 0;
          }

          // if (this.V4 == null) {
          //   res.result_ViewOrder.sales_header.discount_price.sowsD = false;
          // }
          // else {
          //   res.result_ViewOrder.sales_header.discount_price.sowsD = true;

          // }

          this.V3 = (Number(this.V1) - Number(this.V4));
          console.log("V3 => " + this.V3);
          console.log("V4 => " + this.V4);


          this.V5 = (Number(this.V3) + Number(this.V2));

          this.Total = this.V5;
          console.log("V5 => " + this.V3);
          console.log(this.Total + "Fianl Amount");

          // this.EDV = res.result_checkout.cart_items.header.extra_discount_price;

          // this.V7 = (Number(this.V5) - Number(this.EDV));
          // this.Total = this.V7;
          console.log(this.Total + "Fianl New Amount");
          for (let i = 0; i < this.Data.length; i++) {
            // this.product_packages = res.result_checkout.cart_detail[i].package_id;

            // this.pack = res.result_checkout.cart_detail[i];
            this.package_id = this.Data[i].data.selling_price_id;
            console.log(this.package_id);

            const dd = JSON.stringify(this.Data[i].data);
            this.DATA = this.Data[i].data;
            console.log(JSON.stringify(this.DATA));

            if (this.package_id == null) {
              res.result_ViewOrder.sales_detail[i].showData = false;
            }
            else {
              res.result_ViewOrder.sales_detail[i].showData = true;

            }

            // this.pack_data = this.pack;
            // this.newpack = JSON.parse(this.pack_data.package_res);




            // console.log('Pacakge Res => ' + res.result_viewCart.cart_items.header_item[i].package_res);



          }

        }
        else {
          this.loader.loadingDismiss();
          this.toastService.presentToast(res.msg);
        }

      },
      (error: any) => {
        this.loader.loadingDismiss();
        if (JSON.stringify(error.error.errors) != null) {
          this.toastService.presentToast(JSON.stringify(error.error.errors));
        }
        else {
          this.toastService.presentToast("Network Issue...");
        }
      }
    );
  }

  getpackagename(data) {
    // console.log("data "+JSON.stringify(data.package_res));
    return JSON.parse(data.selling_price_res).package_name;
  }
  getpackageqty(data) {
    // return JSON.parse(data.selling_price_res).qty;
  }
  getpackageprice(data) {
    return JSON.parse(data.selling_price_res).product_price_after_discount;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, AlertController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
declare const RazorpayCheckout: any;


@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {

  rad: Number;
  Name: '';
  Mobile: '';
  Address: '';
  user_id: '';
  postData = {
    user_id: '',
    name: '',
    mobile_number: '',
    pincode: '',
    locality: '',
    email: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    alt_phone: ''
  }
  CartItems: any;
  SubTotalPrice = 0;
  ShippingCharge = 0;
  Total = 0;
  product_packages: any;
  showData = false;
  DisFla = false;
  DisExtra = false;
  pack: any;
  pack_data: any;
  package_id: null
  package_name: any;
  package_qty: any;
  package_price: any;
  newpack: any;
  paymentMethods = ["Direct bank transfer", "Cash on delivery"];

  payment_Value = '';
  DiscountValue: any;
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
  total_tax: any;
  constructor(private route: ActivatedRoute,
    private modalController: ModalController,
    public alertController: AlertController,
    public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private storageService: StorageService) {
    setTimeout(() => {
      this.storageService.getRandomNumber().then((val) => {
        if (val) {
          this.rad = val;
        }
        else {

        }

      });
    }, 500);

    this.storageService.getData().then((val) => {
      if (val) {
        this.user_id = val.result_FrontLogin.id;

        this.ConfirmDetails();
        this.HomePageSettings();
      }
      else {
        this.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });
    setTimeout(() => {


    }, 3000);
  }

  ngOnInit() {

  }


  ConfirmDetails() {
    const data = {
      session_id: this.rad,
      user_id: this.user_id
    }
    // this.nav.navigateForward("cart");

    console.log('My shipping_addresses => ' + JSON.stringify(data));
    this.loader.loadingPresent();

    this.authService.checkout(data).subscribe(
      (res: any) => {
        console.log('My shipping_addresses => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();
          // console.log('My shipping_addresses 2 => ' + JSON.stringify(res.result_checkout.shipping_addresses));

          this.postData.address = res.result_checkout.default_address.address;
          this.postData.name = res.result_checkout.default_address.name;
          this.postData.mobile_number = res.result_checkout.default_address.mobile;
          this.postData.email = res.result_checkout.default_address.email;
          this.postData.pincode = res.result_checkout.default_address.pincode;
          this.postData.locality = res.result_checkout.default_address.locality;
          this.postData.landmark = res.result_checkout.default_address.lang_mark;
          this.postData.alt_phone = res.result_checkout.default_address.alternate_phone;
          this.postData.city = res.result_checkout.default_address.city;
          this.ExtraDiscountValue = res.result_checkout.cart_items.header.extra_discount;
          this.DiscountValue = res.result_checkout.cart_items.header.discount_price;
          this.extra_discount_type = res.result_checkout.cart_items.header.extra_discount_type;
          if (res.result_checkout.cart_items.header.total_tax !== null) {
            this.total_tax = res.result_checkout.cart_items.header.total_tax;
          }
          else {
            this.total_tax = '0'
          }

          for (let i = 0; i < res.result_checkout.cart_items.header_item.length; i++) {
            this.SubTotalPrice += Number(res.result_checkout.cart_items.header_item[i].total_price);
            // this.price = this.Data[i].product_packages[i].price;
          }

          this.V1 = this.SubTotalPrice;
          this.V2 = this.ShippingCharge;


          if (this.DiscountValue != null) {
            this.V4 = this.DiscountValue;
          }
          else {
            this.V4 = 0;
          }


          this.V3 = (Number(this.V1) - Number(this.V4));
          console.log("V3 => " + this.V3);
          console.log("V4 => " + this.V4);


          this.V5 = (Number(this.V3) + Number(this.V2));

          this.Total = this.V5;
          console.log("V5 => " + this.V3);
          console.log(this.Total + "Fianl Amount");
          this.CartItems = res.result_checkout;
          for (let i = 0; i < res.result_checkout.cart_detail.length; i++) {

            this.package_id = res.result_checkout.cart_detail[i].selling_price_id;

            console.log(this.package_id);

            //  res.result_viewCart.cart_items.header_item[j].showData = false;

            if (this.package_id == null) {
              res.result_checkout.cart_detail[i].showData = false;
            }
            else {
              res.result_checkout.cart_detail[i].showData = true;

            }


          }


        }
        else {
          this.loader.loadingDismiss();
          this.toastService.presentToast(res);
        }

      },
      (error: any) => {
        this.loader.loadingDismiss();
        this.toastService.presentToast("Error..." + JSON.stringify(error.error.errors));
      }
    );

  }

  openRazorpay() {


    const options = {
      description: 'Credits towards MJD Purefresh',
      image: 'https://mjdmart.com/public/home_page_images/1ca3624dbaaa79d8d737bcac8c323f24.png',
      currency: 'INR',
      key: 'rzp_test_KNebULXXJ3DVBy',
      amount: '100',
      name: 'MJD Purefresh',
      // redirect: true,
      prefill: {
        email: this.postData.email,
        contact: this.postData.mobile_number,
        name: this.postData.name
      },
      theme: {
        color: '#F77734'
      },
      modal: {
        ondismiss() {
          alert('dismissed');
        }
      }
    };




    var successCallback = (payment_id) => {
      // alert('payment_id: ' + payment_id);
      // this.payment_id = payment_id;

      this.storageService.removeCartCount();
      this.nav.navigateForward("/tabs/home");

      // this.loader.loadingPresent();




      // const data = {
      //   payment_type: 'online',
      //   user_id: this.user_id,
      //   payment_response: payment_id,

      // }
      // console.log(JSON.stringify(data));


      // this.authService.CheckoutCashOnDelivery(data).subscribe(
      //   (res: any) => {
      //     this.loader.loadingDismiss();

      //     if (res.error === false) {

      //       this.storageService.removeCartCount();
      //       this.nav.navigateForward("/home/my-order");


      //     }
      //     else {
      //       this.toastService.presentToast(res.msg);

      //     }

      //   },
      //   (error: any) => {
      //     this.loader.loadingDismiss();
      //     if (JSON.stringify(error.error.errors) != null) {
      //       this.toastService.presentToast(JSON.stringify(error.error.errors));
      //     }
      //     else {
      //       this.toastService.presentToast("Network Issue...");
      //     }
      //   }
      // );

    };


    // var successCallback = function (success) {

    //   console.log("Succes ===> " + JSON.stringify(success));


    //   const orderId = success.razorpay_payment_id




    //   var signature = success.razorpay_signature
    //   console.log("PAY_DETAILS => " + success.razorpay_payment_id + " ---- " + JSON.stringify(signature));
    //   alert('payment_id: ' + success.razorpay_payment_id)



    // }

    var cancelCallback = function (error) {
      alert(error.description + ' (Error ' + error.code + ')')
    }

    // RazorpayCheckout.on('payment.success', successCallback)
    // RazorpayCheckout.on('payment.cancel', cancelCallback)
    // RazorpayCheckout.open(options)
    RazorpayCheckout.open(options, successCallback, cancelCallback);


  }


  HomePageSettings() {




    this.authService.HomePageSettings('').subscribe(
      (res: any) => {
        console.log(res);

        if (res.error === false) {

          this.ShippingCharge = res.result_HomePageSettings.shipping_charge;

        }
        else {

          this.toastService.presentToast(res);

        }

      },
      (error: any) => {

        if (JSON.stringify(error.error.errors) != null) {
          this.toastService.presentToast(JSON.stringify(error.error.errors));
        }
        else {
          this.toastService.presentToast("Network Issue...");
        }
      }
    );

  }

  PaymentMethod(value) {
    this.payment_Value = value;
    console.log(value);

    // const data = {
    //   payment_type: this.payment_Value,
    //   user_id: this.user_id,

    // }
    // this.loader.loadingPresent();
    // this.authService.CheckForExtraDiscount(data).subscribe(
    //   (res: any) => {
    //     if (res.error === false) {

    //       this.loader.loadingDismiss();


    //       const data1 = {
    //         session_id: this.rad,
    //         user_id: this.user_id
    //       }
    //       this.loader.loadingPresent();
    //       this.authService.checkout(data1).subscribe(
    //         async (res: any) => {
    //           console.log('Login Data =>' + JSON.stringify(res));
    //           if (res.error === false) {
    //             this.loader.loadingDismiss();

    //             this.EDV = res.result_checkout.cart_items.header.extra_discount_price;

    //             this.V7 = (Number(this.V5) - Number(this.EDV));

    //             this.Total = this.V7;
    //             console.log(this.Total + "Fianl New Amount");


    //           } else {
    //             this.loader.loadingDismiss();
    //             this.toastService.presentToast(res['msg']);
    //           }
    //         },
    //         (error: any) => {
    //           this.loader.loadingDismiss();
    //           if (JSON.stringify(error.error.errors) != null) {
    //             this.toastService.presentToast(JSON.stringify(error.error.errors));
    //           }
    //           else {
    //             this.toastService.presentToast("Network Issue...");
    //           }
    //         }
    //       );

    //     }
    //     else {
    //       this.loader.loadingDismiss();
    //       // this.toast.presentToast(res.msg);

    //     }

    //   },
    //   (error: any) => {
    //     this.loader.loadingDismiss();
    //     if (JSON.stringify(error.error.errors) != null) {
    //       this.toastService.presentToast(JSON.stringify(error.error.errors));
    //     }
    //     else {
    //       this.toastService.presentToast("Network Issue...");
    //     }
    //   }
    // );

  }
  goToThankYouPage() {
    if (this.payment_Value == '') {

      this.toastService.presentToast('Select Payment Method');
    }



    else if (this.payment_Value == 'razor_pay') {
      const options = {
        description: 'Credits towards MJD Purefresh',
        image: 'https://mjdmart.com/public/home_page_images/1ca3624dbaaa79d8d737bcac8c323f24.png',
        currency: 'INR',
        key: 'rzp_test_KNebULXXJ3DVBy',
        amount: '100',
        name: 'MJD Purefresh',
        // redirect: true,
        prefill: {
          email: this.postData.email,
          contact: this.postData.mobile_number,
          name: this.postData.name
        },
        theme: {
          color: '#F77734'
        },
        modal: {
          ondismiss() {
            alert('dismissed');
          }
        }
      };

      var successCallback = (payment_id) => {
        // alert('payment_id: ' + payment_id);
        // this.payment_id = payment_id;

        this.storageService.removeCartCount();
        // this.nav.navigateForward("/tabs/home");
        const data = {
          payment_type: this.payment_Value,
          user_id: this.user_id,
          payment_response: payment_id
        }
        this.loader.loadingPresent();
        this.authService.CheckoutCashOnDelivery(data).subscribe(
          (res: any) => {
            if (res.error === false) {
  
              this.loader.loadingDismiss();
              this.toastService.presentToast(res.msg);
              this.storageService.removeCartCount();
              this.nav.navigateForward("thankyou-page");
  
  
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

      var cancelCallback = function (error) {
        alert(error.description + ' (Error ' + error.code + ')')
      }

      // RazorpayCheckout.on('payment.success', successCallback)
      // RazorpayCheckout.on('payment.cancel', cancelCallback)
      // RazorpayCheckout.open(options)
      RazorpayCheckout.open(options, successCallback, cancelCallback);


    }

    else {

      const data = {
        payment_type: this.payment_Value,
        user_id: this.user_id,
        payment_response: ''
      }
      this.loader.loadingPresent();
      this.authService.CheckoutCashOnDelivery(data).subscribe(
        (res: any) => {
          if (res.error === false) {

            this.loader.loadingDismiss();
            this.toastService.presentToast(res.msg);
            this.storageService.removeCartCount();
            this.nav.navigateForward("thankyou-page");


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
    // else {

    //   const data = {
    //     payment_type: this.payment_Value,
    //     user_id: this.user_id,
    //     payment_response: ''
    //   }
    //   this.loader.loadingPresent();
    //   this.authService.CheckoutCashOnDelivery(data).subscribe(
    //     (res: any) => {
    //       if (res.error === false) {

    //         this.loader.loadingDismiss();
    //         this.toastService.presentToast(res.msg);
    //         this.storageService.removeCartCount();
    //         this.nav.navigateForward("thankyou-page");


    //       }
    //       else {
    //         this.loader.loadingDismiss();
    //         this.toastService.presentToast(res.msg);

    //       }

    //     },
    //     (error: any) => {
    //       this.loader.loadingDismiss();
    //       if (JSON.stringify(error.error.errors) != null) {
    //         this.toastService.presentToast(JSON.stringify(error.error.errors));
    //       }
    //       else {
    //         this.toastService.presentToast("Network Issue...");
    //       }
    //     }
    //   );
    // }
  }

  pay() {

  }

  getpackagename(data) {
    return JSON.parse(data.selling_price_res).package_name;
  }
  getpackageqty(data) {
    // return JSON.parse(data.selling_price_res).qty;
  }
  getpackageprice(data) {
    return JSON.parse(data.selling_price_res).product_price_after_discount;
  }
}
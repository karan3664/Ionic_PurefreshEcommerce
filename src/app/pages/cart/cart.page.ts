import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { LoginPage } from '../login/login.page';
import { CouponPage } from '../coupon/coupon.page';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {


  randomNumber: Number;
  rad: Number;

  CartItems: any;
  Items: any;

  product_name: any;
  qty: any;
  total_price: any;
  header_item: any = [];
  user_id: any;
  qtyy = 0;
  product_id: any = [];
  SubTotalPrice = 0;
  gridVisiable = true;
  showData = false;
  DisFla = false;

  selling_price_id: null
  package_name: any;
  package_qty: any;
  package_price: any;
  newpack: any;
  product_packages: any;
  CoponsList: any;
  coupon_discount: '';
  coupon: ''
  constructor(private route: ActivatedRoute,
    private modalController: ModalController,
    public alertController: AlertController,
    public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    private socialSharing: SocialSharing,
    private storageService: StorageService) {
    this.randomNumber = Math.random();
    this.storageService.getData().then((val) => {
      if (val) {
        this.user_id = val.result_FrontLogin.id;
      }
      else {
        this.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });

    setTimeout(() => {
      this.storageService.getRandomNumber().then((val) => {
        if (val) {
          this.rad = val;
          this.MyCart();
        }
        else {
          this.rad = this.randomNumber;
          this.storageService.setRandomNumber(this.randomNumber);

        }

      });
    }, 500);



  }


  ngOnInit() {
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.MyCart();
    }, 1000);
  }

  MyCart() {
    const data = {
      session_id: this.rad,
      user_id: this.user_id
    }
    // this.nav.navigateForward("cart");


    this.loader.loadingPresent();

    this.authService.MyCartItems(data).subscribe(
      (res: any) => {
        console.log('My Cart Data => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();

          this.CartItems = res.result_viewCart;


          this.Items = res.result_viewCart.cart_items.header_item;
          this.storageService.setCartCount(res.result_viewCart.cart_items.header.total_qty);

          for (let j = 0; j < res.result_viewCart.cart_items.header_item.length; j++) {
            // this.qty = this.Items[j].qty;
            this.product_id = this.Items[j].product_id;

            this.SubTotalPrice += Number(res.result_viewCart.cart_items.header_item[j].total_price);

            // this.pack = res.result_viewCart.cart_items.header_item[i];
            this.selling_price_id = res.result_viewCart.cart_items.header_item[j].selling_price_id;
            this.product_packages = res.result_viewCart.cart_items.header_item[j].selling_price_id;

            // console.log(this.selling_price_id);

            if (this.selling_price_id == null) {
              res.result_viewCart.cart_items.header_item[j].showData = false;
            }
            else {
              res.result_viewCart.cart_items.header_item[j].showData = true;

            }

          }
          if (this.CartItems.cart_items.header_item.length == 0) {
            this.gridVisiable = false;
          }



        }
        else {
          this.loader.loadingDismiss();
          this.toastService.presentToast(res);
        }

      },
      (error: any) => {
        this.loader.loadingDismiss();
        this.toastService.presentToast('Network Issue');
      }
    );

  }

  Delete(product_id, selling_price_id) {
    var sp_id: '';
    if (selling_price_id != null) {
      sp_id = selling_price_id
    }
    else {
      sp_id = ''

    }
    const data = {
      session_id: this.rad,
      user_id: this.user_id,
      product_id: product_id,
      selling_price_id: sp_id
    }
    // this.nav.navigateForward("cart");

    console.log('My Cart Data => ' + JSON.stringify(data));
    this.loader.loadingPresent();

    this.authService.remove_product_from_cart(data).subscribe(
      (res: any) => {
        console.log('My Cart Data => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();

          this.toastService.presentToast(res.msg);
          this.MyCart();

        }
        else {
          this.loader.loadingDismiss();
          this.toastService.presentToast(res);
        }

      },
      (error: any) => {
        this.loader.loadingDismiss();
        this.toastService.presentToast('Network Issue');
      }
    );

  }

  addQuantity(product_id, j) {
    const pid = this.CartItems.cart_items.header_item[j].product_id;
    if (pid == product_id) {
      this.CartItems.cart_items.header_item[j].qty++;
      console.log(j + "--" + this.CartItems.cart_items.header_item[j].qty);

      var selling_price_id = this.CartItems.cart_items.header_item[j].selling_price_id;

      if (selling_price_id != null) {
        selling_price_id = this.CartItems.cart_items.header_item[j].selling_price_id;
      }
      else {
        selling_price_id = ''
      }
      const data = {
        session_id: this.rad,
        user_id: this.user_id,
        product_id: product_id,
        selling_price_id: '',
        plus_or_minus: 'plus',
        price: this.CartItems.cart_items.header_item[j].price

      }


      this.loader.loadingPresent();

      this.authService.update_cart(data).subscribe(
        (res: any) => {
          console.log('My Cart Data ++ => ' + JSON.stringify(res));
          if (res.error === false) {
            this.loader.loadingDismiss();

            this.toastService.presentToast(JSON.stringify(res.msg));
            this.MyCart();
            this.SubTotalPrice += Number(JSON.stringify(res.item_total_price));
            this.storageService.setCartCount(res.total_cart);
            // this.CartItems.cart_items.header_item[j].qty = JSON.stringify(res.item_qty);
            // this.CartItems.cart_items.header_item[j].total_price = JSON.stringify(res.item_total_price);
          }
          else {
            this.loader.loadingDismiss();
            this.toastService.presentToast(res.msg);
          }

        },
        (error: any) => {
          this.loader.loadingDismiss();
          this.toastService.presentToast('Network Issue');
        }


      )
    }




  }


  minusQuantity(product_id, i) {
    const pid = this.CartItems.cart_items.header_item[i].product_id;
    if (pid == product_id) {
      if (this.CartItems.cart_items.header_item[i].qty > 0) {
        this.CartItems.cart_items.header_item[i].qty--
        console.log(i + "--" + this.CartItems.cart_items.header_item[i].qty);
        this.SubTotalPrice += Number(this.CartItems.cart_items.header_item[i].total_price);


        var selling_price_id = this.CartItems.cart_items.header_item[i].selling_price_id;

        if (selling_price_id != null) {
          selling_price_id = this.CartItems.cart_items.header_item[i].selling_price_id;
        }
        else {
          selling_price_id = ''
        }
        const data = {
          session_id: this.rad,
          user_id: this.user_id,
          product_id: product_id,
          selling_price_id: '',
          plus_or_minus: 'minus',
          price: this.CartItems.cart_items.header_item[i].price

        }


        this.loader.loadingPresent();

        this.authService.update_cart(data).subscribe(
          (res: any) => {
            console.log('Update Cart Data => ' + JSON.stringify(res));
            if (res.error === false) {
              this.loader.loadingDismiss();

              this.toastService.presentToast(JSON.stringify(res.msg));
              this.MyCart();
              this.SubTotalPrice += Number(JSON.stringify(res.item_total_price));
              this.storageService.setCartCount(res.total_cart);
              // this.CartItems.cart_items.header_item[i].qty = JSON.stringify(res.item_qty);
              // this.CartItems.cart_items.header_item[i].total_price = JSON.stringify(res.item_total_price);
            }
            else {
              this.loader.loadingDismiss();
              this.toastService.presentToast(res.msg);
            }

          },
          (error: any) => {
            this.loader.loadingDismiss();
            this.toastService.presentToast('Network Issue');
          }


        )
      }
    }

  }


  // PACKAGE Add Minus

  addQuantityPackage(product_id, j, pp, id) {

    console.log(pp);

    const pid = this.CartItems.cart_items.header_item[j].product_id;
    if (pid == product_id) {
      this.CartItems.cart_items.header_item[j].qty++;
      console.log(j + "--" + this.CartItems.cart_items.header_item[j].qty);

      var selling_price_id = this.CartItems.cart_items.header_item[j].selling_price_id;

      if (selling_price_id != null) {
        selling_price_id = this.CartItems.cart_items.header_item[j].selling_price_id;
      }
      else {
        selling_price_id = ''
      }

      var pack_id = '';
      if (this.product_packages != 'null') {
        pack_id = this.product_packages;
      }
      else {
        pack_id = '';
      }
      const data = {
        session_id: this.rad,
        user_id: this.user_id,
        product_id: product_id,
        selling_price_id: selling_price_id,
        plus_or_minus: 'plus',
        price: pp,
        // package_id: id


        // session_id: this.rad,
        // user_id: this.user_id,
        // product_id: product_id,
        // selling_price_id: selling_price_id,
        // plus_or_minus: 'plus',
        // price: this.CartItems.cart_items.header_item[j].price
      }
      console.log('Update Cart Data => ' + JSON.stringify(data));

      this.loader.loadingPresent();

      this.authService.update_cart(data).subscribe(
        (res: any) => {
          // console.log('My Cart Data => ' + JSON.stringify(res));
          if (res.error === false) {
            this.loader.loadingDismiss();

            this.toastService.presentToast(JSON.stringify(res.msg));
            this.MyCart();
            this.SubTotalPrice += Number(JSON.stringify(res.item_total_price));
            // this.CartItems.cart_items.header_item[j].qty = JSON.stringify(res.item_qty);
            // this.CartItems.cart_items.header_item[j].total_price = JSON.stringify(res.item_total_price);
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


      )
    }




  }

  minusQuantityPackage(product_id, i, pp, id) {
    const pid = this.CartItems.cart_items.header_item[i].product_id;
    if (pid == product_id) {
      if (this.CartItems.cart_items.header_item[i].qty > 0) {
        this.CartItems.cart_items.header_item[i].qty--
        console.log(i + "--" + this.CartItems.cart_items.header_item[i].qty);
        this.SubTotalPrice += Number(this.CartItems.cart_items.header_item[i].total_price);


        var selling_price_id = this.CartItems.cart_items.header_item[i].selling_price_id;

        if (selling_price_id != null) {
          selling_price_id = this.CartItems.cart_items.header_item[i].selling_price_id;
        }
        else {
          selling_price_id = ''
        }

        var pack_id = '';
        if (this.product_packages != 'null') {
          pack_id = this.product_packages;
        }
        else {
          pack_id = '';
        }
        const data = {
          session_id: this.rad,
          user_id: this.user_id,
          product_id: product_id,
          selling_price_id: selling_price_id,
          plus_or_minus: 'minus',
          price: pp,
          // package_id: id

        }
        console.log('Update Cart Data => ' + JSON.stringify(data));

        this.loader.loadingPresent();

        this.authService.update_cart(data).subscribe(
          (res: any) => {
            console.log('Update Cart Data => ' + JSON.stringify(res));
            if (res.error === false) {
              this.loader.loadingDismiss();

              this.toastService.presentToast(JSON.stringify(res.msg));
              this.MyCart();
              this.SubTotalPrice += Number(JSON.stringify(res.item_total_price));

              // this.CartItems.cart_items.header_item[i].qty = JSON.stringify(res.item_qty);
              // this.CartItems.cart_items.header_item[i].total_price = JSON.stringify(res.item_total_price);
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


        )
      }
    }

  }

  async CheckOutPage() {

    if (this.user_id != '') {

      this.nav.navigateForward("shipping-address");
    }
    else {
      const modal = await this.modalController.create({
        component: LoginPage,
        componentProps: {
          // 'po_id': '',
          // 'dc_id': '',
          // 'to_user_id': ''
        }
      });
      modal.onDidDismiss()
        .then((data) => {

          // const user = data['data']; // Here's your selected user!
          // console.log("Token =>" + user);
          // this.toke = user;
          window.location.reload();
        });
      return await modal.present();

    }



  }
  async isCoupon() {

    if (this.user_id != '') {
      const data = {

        user_id: this.user_id,
        coupon: this.coupon
        // selling_price_id: sp_id
      }

      this.loader.loadingPresent();

      this.authService.ApplyCoupon(data).subscribe(
        (res: any) => {
          console.log('My Coupon => ' + JSON.stringify(res));
          if (res.error === false) {
            this.loader.loadingDismiss();

            this.toastService.presentToast(res.msg);
            this.MyCart();

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
    else {
      const modal = await this.modalController.create({
        component: LoginPage,
        componentProps: {
          // 'po_id': '',
          // 'dc_id': '',
          // 'to_user_id': ''
        }
      });

      modal.onDidDismiss()
        .then((data) => {

          const user = data['data']; // Here's your selected user!
          console.log("Token =>" + user);
          // this.toke = user;
          window.location.reload();
        });
      return await modal.present();

    }


  }

  getpackagename(data) {
    // console.log("data => " + JSON.stringify(data));

    return JSON.parse(data.selling_price_res).package_name;
  }
  getpackageqty(data) {
    // return JSON.parse(data.qty);
  }
  getpackageprice(data) {
    return JSON.parse(data.selling_price_res).product_price_after_discount;
  }
  getpackageid(data) {
    return JSON.parse(data.selling_price_res).id;
  }
  openProductsPage() {
    this.nav.navigateForward("home");
  }
  RemoveCoupon(id) {
    console.log("Coupon Id => " + id);

    this.loader.loadingPresent();
    const data = {

      user_id: this.user_id,
      coupon_id: id
      // selling_price_id: sp_id
    }

    this.authService.RemoveCoupon(data).subscribe(
      (res: any) => {
        console.log('My Coupon => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();

          this.toastService.presentToast(res.msg);
          this.MyCart();

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


  async AppLyCoupon() {
    const modal = await this.modalController.create({
      component: CouponPage,
      cssClass: 'test-modal',
      componentProps: {

      }
    });
    modal.onDidDismiss()
      .then((data) => {
        window.location.reload();
      });

    return await modal.present();
  }
}

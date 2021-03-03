import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { interval } from 'rxjs';
import { LoginPage } from '../login/login.page';
import { WritereviewPage } from '../writereview/writereview.page';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  ProductName = '';
  data: any[];
  heart = false;
  slideOpts = {
    slidesPerView: 2.3,
  };
  slides = [];
  sliderConfig = {
    slidesPerView: 2.5,
    spaceBetween: 0
  }
  gridVisiable: any;
  product_qty: number;
  product_id: '';
  Data = {
    price: '',
    stock: '',
    product_detail: '',
    unit_name: ''

  };
  qtyy = 0;
  user_id: any;
  total_cart = '';
  rate: any;
  randomNumber: Number;
  rad: Number;
  selling_price_id: any;
  package_name: any;
  selling_price_res: any;
  productPricing: any = [];
  product_discount: any;
  productPricingValue: any;
  filtermonthwise: any;
  selectedIndex: number;
  convertedPrice: any;
  finalprice: any;
  final_selling_price_id: any;
  final_selling_price_res: any;
  final_product_discount: any;
  toke: any;
  offerconvertedPrice: any;
  offergramValue: any;
  offerselling_price_id: any;
  offerselling_price_res: any;
  offerproductPricingValue: any;
  offerproductPricing: any[];
  showDatass = false;
  NewOfferedData: any;
  category_id: any;
  category_name: any;

  constructor(private route: ActivatedRoute,
    public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    public router: Router,
    private toastService: ToastService,
    public modalController: ModalController,
    private socialSharing: SocialSharing,
    private storageService: StorageService) {
    // this.CategoryName = this.route.snapshot.params['CategoryName'];
    this.product_id = this.route.snapshot.params['id']
    console.log(this.product_id);
    this.toke = localStorage.getItem('token');
    console.log("toke =>" + this.toke);

    interval(100).subscribe(x => {
      this.storageService.getCartCount().then((val) => {
        if (val) {
          this.total_cart = val;
        }
        else {
          this.total_cart = '0';

        }

      });
    });
    this.randomNumber = Math.random();

    setTimeout(() => {
      this.storageService.getRandomNumber().then((val) => {
        if (val) {
          this.rad = val;
        }
        else {
          this.rad = this.randomNumber;
          this.storageService.setRandomNumber(this.randomNumber);

        }

      });
    }, 500);

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
      this.ProductDetails();
    }, 1000)
  }

  ngOnInit() {
  }
  ProductDetails() {
    this.loader.loadingPresent();
    const data = {
      user_id: this.user_id,
      product_id: this.product_id
    }
    console.log('Product Details => ' + JSON.stringify(data));

    this.authService.GetProductDetails(data).subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          this.loader.loadingDismiss();
          this.Data = res.result_GetProductDetails;
          this.data = res.result_GetProductDetails.related_products;
          this.gridVisiable = res.result_GetProductDetails;
          this.category_id = res.result_GetProductDetails.category_1;
          this.category_name = res.result_GetProductDetails.category_name_1;
          this.Data.price = res.result_GetProductDetails.product_price_after_discount;
          this.product_qty = res.result_GetProductDetails.product_qty;
          this.ProductName = res.result_GetProductDetails.product_name;
          this.Data.product_detail = res.result_GetProductDetails.product_detail;
          this.productPricing = res.result_GetProductDetails.product_pricing;
          this.product_discount = res.result_GetProductDetails.product_discount;
          this.slides = res.result_GetProductDetails.product_images;

          // this.selling_price_id = res.result_GetProductDetails.product_pricing;
          for (let i = 0; i < res.result_GetProductDetails.product_pricing.length; i++) {
            this.selling_price_id = res.result_GetProductDetails.product_pricing[i].id;
            this.selectedIndex = res.result_GetProductDetails.product_pricing[0].package_name;
            console.log('selling_price_id =>' + this.selling_price_id);
            this.filtermonthwise = res.result_GetProductDetails.product_pricing[0];
            this.convertedPrice = res.result_GetProductDetails.product_pricing[0].converted_price_after_margin;
            this.selling_price_res = res.result_GetProductDetails.product_pricing[0];
          }



          for (let i = 0; i < res.result_GetProductDetails.related_products.length; i++) {
            this.NewOfferedData = res.result_GetProductDetails.related_products[i];
            console.log(this.NewOfferedData.product_pricing);

            if (this.NewOfferedData.product_pricing.length > 0) {

              this.offerproductPricing = this.NewOfferedData.product_pricing;
              // for (let ip = 0; ip < this.productPricing.length; ip++) {

              // }

              this.offergramValue = this.offerproductPricing[0];
              this.offerconvertedPrice = this.offerproductPricing[0].product_price_after_discount;
              this.offerselling_price_res = this.offerproductPricing[0];
              this.offerselling_price_id = this.offerproductPricing[i].id;
              // this.productPricingValue = this.productPricing[0];
              console.log('this.offergramValue =>' + this.offergramValue);
            }

            if (this.NewOfferedData.product_pricing.length < 1) {
              console.log("False");
              // this.selling_price_res = [];
              this.NewOfferedData.product_pricing.showDatass = false;
            }
            else {
              // this.selling_price_res = res.result_BestSellingItemsHome[i].product_pricing[0];
              console.log("True");
              this.NewOfferedData.product_pricing.showDatass = true;
            }
            // = this.package_name;

          }

          if (res.result_GetProductDetails.wish_list != this.heart) {
            this.heart = !this.heart;
          } else {
            this.heart = this.heart;
          }
          if (this.product_qty > 0) {
            this.Data.stock = 'In Stock'
          }
          else {
            this.Data.stock = 'Out Of Stock'
          }
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
    );
    // this.postData.Suppliers = JSON.stringify(this.data['to_name']);
  }


  async share() {
    this.socialSharing.share(this.ProductName, '', null, '');
    // this.toast.presentToast("Share Is Clicked");
  }

  async clickWishList() {

    var userid = '';


    if (this.user_id != '') {

      if (this.toke != '') {
        userid = this.toke;
      }
      else {
        userid = this.user_id;
      }

      const data = {
        user_id: userid,
        product_id: this.product_id

      }
      console.log("heart => " + JSON.stringify(data));
      this.loader.loadingPresent();

      if (this.heart != true) {
        this.heart = !this.heart;
        this.authService.AddToWishList(data).subscribe(
          (res: any) => {
            console.log(res);
            if (res.error === false) {
              this.loader.loadingDismiss();

              this.toastService.presentToast('Added To Wish List!');
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
        this.heart = !this.heart;

        this.authService.remove_product_from_wishlist(data).subscribe(
          (res: any) => {
            console.log(res);
            if (res.error === false) {
              this.loader.loadingDismiss();

              this.toastService.presentToast('Removed From Wish List!');
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
    }
    else {
      const modal = await this.modalController.create({
        component: LoginPage,
        componentProps: {
          'po_id': this.product_id,
          // 'dc_id': '',
          // 'to_user_id': ''
        }
      });

      modal.onDidDismiss()
        .then((data) => {

          const user = data['data']; // Here's your selected user!
          console.log("Token =>" + user);
          this.toke = user;
          window.location.reload();
        });

      return await modal.present();
    }



  }


  ProductPricingChange(value) {
    console.log('Seleted Value => ' + JSON.stringify(value));
    this.productPricingValue = value;
    this.convertedPrice = value.converted_price_after_margin;
    this.selling_price_id = this.productPricingValue.id;
    this.selling_price_res = value;
  }

  goToCart() {
    if (this.convertedPrice != null) {
      this.finalprice = this.convertedPrice;
    }
    else {
      this.finalprice = this.Data.price;
    }

    if (this.selling_price_id != null) {
      this.final_selling_price_id = this.selling_price_id;
    }
    else {
      this.final_selling_price_id = '';
    }
    if (this.selling_price_res != null) {
      this.final_selling_price_res = JSON.stringify(this.selling_price_res);
    }
    else {
      this.final_selling_price_res = '';
    }

    if (this.product_discount != null) {
      this.final_product_discount = JSON.stringify(this.product_discount);
    }
    else {
      this.final_product_discount = '';
    }
    const data = {
      session_id: this.rad,
      product_id: this.product_id,
      price: this.finalprice,
      selling_price_id: this.final_selling_price_id,
      selling_price_res: this.final_selling_price_res,
      product_discount: this.final_product_discount,
      user_id: this.user_id
    }
    // this.nav.navigateForward("cart");
    console.log('Add To Cart Data => ' + JSON.stringify(data));

    this.loader.loadingPresent();

    this.authService.AddToCart(data).subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          this.toastService.presentToast(res.msg);
          this.loader.loadingDismiss();
          this.storageService.setCartCount(res.total_cart);
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
    );

  }
  goToCartPage() {
    // this.nav.navigateForward("cart");
    this.router.navigateByUrl('tabs/cart');

  }

  GotoRealedProductPage() {
    localStorage.setItem('catId', this.category_id);
    localStorage.setItem('name', this.category_name);
    this.router.navigateByUrl('category-product');
  }
  goToProductDetail(id) {
    // this.nav.navigateForward("product-detail/", id);
    // this.router.navigate(["product-details/", id]);
    this.router.navigate(['product-detail/' + id]);

  }

  OfferProductPricingChange(value) {
    console.log('Seleted Value => ' + JSON.stringify(value));
    this.offerproductPricingValue = value;
    this.offerconvertedPrice = value.product_price_after_discount;
    this.offerselling_price_id = this.offerproductPricingValue.id;
    this.offerselling_price_res = value;
  }


  goToCartOffer(id, price, name, pfp) {

    // console.log(JSON.stringify(pfp));

    if (pfp.length < 1) {
      console.log("ProdPric => " + 'empty');




      if (this.product_discount != null) {
        this.final_product_discount = JSON.stringify(this.product_discount);
      }
      else {
        this.final_product_discount = '';
      }
      const data = {
        session_id: this.rad,
        product_id: id,
        price: price,
        selling_price_id: '',
        selling_price_res: '',
        product_discount: this.final_product_discount,
        user_id: this.user_id
      }
      console.log('Add To Cart Data => ' + JSON.stringify(data));

      this.loader.loadingPresent();

      this.authService.AddToCart(data).subscribe(
        (res: any) => {
          console.log(res);
          if (res.error === false) {
            this.toastService.presentToast(res.msg);
            this.loader.loadingDismiss();
            this.storageService.setCartCount(res.total_cart);
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
      );


    }
    else {

      // if (this.convertedPrice != null) {
      //   this.finalprice = this.convertedPrice;
      // }
      // else {
      //   this.finalprice = price;
      // }

      // if (this.selling_price_id != null) {
      //   this.final_selling_price_id = this.selling_price_id;
      // }
      // else {
      //   this.final_selling_price_id = '';
      // }
      // if (this.selling_price_res != null) {
      //   this.final_selling_price_res = JSON.stringify(this.selling_price_res);
      // }
      // else {
      //   this.final_selling_price_res = '';
      // }
      this.loader.loadingPresent();
      if (this.product_discount != null) {
        this.final_product_discount = JSON.stringify(this.product_discount);
      }
      else {
        this.final_product_discount = '';
      }
      const data = {
        session_id: this.rad,
        product_id: id,
        price: this.offerconvertedPrice,
        selling_price_id: this.offerselling_price_id,
        selling_price_res: JSON.stringify(this.offerselling_price_res),
        product_discount: this.final_product_discount,
        user_id: this.user_id
      }
      console.log('Add To Cart Data with res => ' + JSON.stringify(data));



      this.authService.AddToCart(data).subscribe(
        (res: any) => {
          console.log(res);
          if (res.error === false) {
            this.toastService.presentToast(res.msg);
            this.loader.loadingDismiss();
            this.storageService.setCartCount(res.total_cart);
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
      );


    }

  }


  async openReviewsPage() {
    const modal = await this.modalController.create({
      component: WritereviewPage,
      componentProps: {
        'id': this.product_id,
        'session_id': this.rad,
        'price': this.Data.price,
        'user_id': this.user_id
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

  onModelChange(rating) {
    console.log("changed rating: ", rating);

    const data = {
      star: rating,
      products_id: this.product_id,
      user_id: this.user_id
    }

    console.log('Add To Cart Data => ' + JSON.stringify(data));

    this.loader.loadingPresent();

    this.authService.RateProduct(data).subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          this.toastService.presentToast(res.msg);
          this.loader.loadingDismiss();
          // this.storageService.setCartCount(res.total_cart);

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

    // do your stuff
  }
}

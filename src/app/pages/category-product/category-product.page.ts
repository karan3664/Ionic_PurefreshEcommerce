import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { NavController, MenuController, ActionSheetController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { StorageService } from 'src/app/services/storage.service';
import { interval } from 'rxjs';
@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.page.html',
  styleUrls: ['./category-product.page.scss'],
})
export class CategoryProductPage implements OnInit {

  CategoryName = '';
  cat_id = '';
  data: any[] = [];
  pageno = 1;
  pageLimit = 10000;
  finalData: any;

  postData: any = [{
    product_name: '',
    unit_name: ''
  }];
  catid: any;
  brdnid: any;
  actionSheet: any;
  filtermonthwise: '';
  Categories: any;
  // public itemsHome: any = [];//home list
  public itemsCategory: any = [];//category list
  visibleCategory = false;//for category expand
  catId: any = [];
  pricemin: any;
  pricemax: any;
  sortby: any;

  gramValue: any;
  convertedPrice: any;
  selling_price_id: any;
  package_name: any;
  selling_price_res: any;
  productPricing: any[];
  DDP: any;
  product_discount: any;
  productPricingValue: any;
  showData = false;
  Data: any;
  finalprice: any;
  final_selling_price_id: any;
  final_selling_price_res: any;
  final_product_discount: any;
  user_id: any;
  total_cart = '';
  randomNumber: Number;
  rad: Number;
  quantiy = 0;
  constructor(private route: ActivatedRoute,
    public menuCtrl: MenuController,
    public appcompo: AppComponent,
    public actionSheetController: ActionSheetController,
    public nav: NavController,
    public router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private loader: LoaderService,
    private toast: ToastService) {
    this.CategoryName = localStorage.getItem('name');
    // this.cat_id = this.route.snapshot.params['id'];
    console.log(this.cat_id);

    this.ProductByCategory(false, "");
    this.sortby = 'new';
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
  }

  ngOnInit() {
    this.menuCtrl.enable(true, 'menuAdmin');
  }


  ProductByCategory(isFirstLoad, event) {
    this.loader.loadingPresent();
    var toke = localStorage.getItem('catId');
    var brnd = localStorage.getItem('BrandId');
    var pmin = localStorage.getItem('price_min');
    var pmax = localStorage.getItem('price_max');

    console.log('catId => ' + toke);
    console.log('brnd => ' + brnd);
    console.log('pmin => ' + pmin);
    console.log('pmax => ' + pmax);

    if (this.catid != '') {
      this.catid = toke;
    }
    else {
      this.catid = this.cat_id;
    }

    if (this.brdnid != '') {
      this.brdnid = brnd;
    }
    else {
      this.brdnid = '';
    }

    if (this.pricemin != '') {
      this.pricemin = pmin
    }
    else {
      this.pricemin = ''
    }
    if (this.pricemax != '') {
      this.pricemax = pmax
    }
    else {
      this.pricemax = ''
    }
    const params = {
      page: this.pageno,
      sortBy: '',
      MinPrice: this.pricemin,
      MaxPrice: this.pricemax,
      CategoryIds: this.catid,
      BrandId: this.brdnid,
      Text: '',
      location_id: '',
      limit: '',
    }

    console.log('Params =>  ' + JSON.stringify(params));

    this.authService.Products(params).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();
          // this.data = res.result_products.products.data;
          // this.finalData = this.data;
          // console.log(this.finalData);

          for (let ii = 0; ii < res.result_products.products.data.length; ii++) {
            this.postData = res.result_products.products.data[ii];
            this.Data = res.result_products.products.data[ii];
            this.data.push(this.Data);
            this.finalData = this.data;
            if (this.Data.product_pricing.length > 0) {
              this.productPricing = this.Data.product_pricing;
              this.DDP = this.productPricing[0].discount_margin;




              this.gramValue = this.productPricing[0];
              this.convertedPrice = this.productPricing[0].product_price_after_discount;
              this.selling_price_res = this.productPricing[0];
              this.selling_price_id = this.productPricing[0].id;

              console.log("Selling Price Id = >" + JSON.stringify(this.productPricing[0].id));

            }

            if (res.result_products.products.data[ii].product_pricing.length < 1) {
              console.log("False");
              // this.selling_price_res = [];
              res.result_products.products.data[ii].product_pricing.showData = false;
            }
            else {
              // this.selling_price_res = res.result_BestSellingItemsHome[i].product_pricing[0];
              console.log("True");
              res.result_products.products.data[ii].product_pricing.showData = true;
            }
          }


          if (isFirstLoad)
            event.target.complete();
          this.pageno++;

        }
        else {
          this.loader.loadingDismiss();
          this.toast.presentToast(res.msg);
        }

      },
      (error: any) => {
        this.loader.loadingDismiss();
        this.toast.presentToast('Network Issue');
      }
    );
    // this.postData.Suppliers = JSON.stringify(this.data['to_name']);
  }
  doInfinite(event) {
    this.ProductByCategory(true, event);
  }
  goToSearchPage() {
    // this.nav.navigateForward("search");
    this.router.navigateByUrl('search');
  }
  goToCartPage() {
    this.router.navigateByUrl('tabs/cart');
  }
  goToProductDetail(id) {
    this.router.navigate(["product-detail/", id]);
  }
  onIconClick(p) {

  }

  changeLayout() {
    // if (this.productView == 'list') this.productView = "grid";
    // else this.productView = "list";
  }
  SortByOrder(value) {
    this.loader.loadingPresent();
    console.log(value);
    const params = {
      page: this.pageno,
      sortBy: value,
      MinPrice: '',
      MaxPrice: '',
      CategoryIds: this.catid,
      BrandId: '',
      Text: '',
      location_id: '',
      limit: ''
    }

    console.log('Params =>  ' + JSON.stringify(params));

    this.authService.Products(params).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.error === false) {
          this.loader.loadingDismiss();
          this.data = res.result_products.products.data;
          this.finalData = this.data;
          // console.log(this.finalData);

          for (let i = 0; i < res.result_products.products.data.length; i++) {
            this.postData = res.result_products.products.data[i];

            // console.log('Product Name => ' + JSON.stringify(this.postData));
          }

        }
        else {
          this.loader.loadingDismiss();
          this.toast.presentToast(res.msg);
        }

      },
      (error: any) => {
        this.loader.loadingDismiss();
        this.toast.presentToast('Network Issue');
      }
    );

  }
  refresh() {

    this.ProductByCategory(false, "");
  }

  openRightMenu() {
    console.log("funnel clicked")
    this.menuCtrl.enable(false, 'menu1');
    this.menuCtrl.enable(true, 'menuAdmin');
  }

  ionViewWillLeave() {
    // this.menuCtrl.enable(true, 'menu1');
    // this.menuCtrl.enable(false, 'menuAdmin');

  }



  ProductPricingChange(value) {
    console.log('Seleted Value => ' + JSON.stringify(value));
    this.productPricingValue = value;
    this.convertedPrice = value.product_price_after_discount;
    this.selling_price_id = this.productPricingValue.id;
    this.selling_price_res = value;
    this.DDP = value.discount_margin;
  }


  goToCart(id, price, name, pp) {


    if (pp.length < 1) {
      console.log("ProdPric => " + 'empty');
      if (this.convertedPrice != null) {
        this.finalprice = this.convertedPrice;
      }
      else {
        this.finalprice = price;
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
            this.toast.presentToast(res.msg);
            this.loader.loadingDismiss();
            this.storageService.setCartCount(res.total_cart);
          }
          else {
            this.loader.loadingDismiss();
            this.toast.presentToast(res.msg);
          }

        },
        (error: any) => {
          this.loader.loadingDismiss();
          this.toast.presentToast('Network Issue');
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
        price: this.convertedPrice,
        selling_price_id: this.selling_price_id,
        selling_price_res: JSON.stringify(this.selling_price_res),
        product_discount: this.final_product_discount,
        user_id: this.user_id
      }
      console.log('Add To Cart Data with res => ' + JSON.stringify(data));



      this.authService.AddToCart(data).subscribe(
        (res: any) => {
          console.log(res);
          if (res.error === false) {
            this.toast.presentToast(res.msg);
            this.loader.loadingDismiss();
            this.storageService.setCartCount(res.total_cart);
          }
          else {
            this.loader.loadingDismiss();
            this.toast.presentToast(res.msg);
          }

        },
        (error: any) => {
          this.loader.loadingDismiss();
          this.toast.presentToast('Network Issue');
        }
      );


    }

  }


  add(index) {
    this.quantiy = 1;
    // this.api.checkAuth().then((user) => {
    //   if (user) {
    //     const vid = localStorage.getItem('vid');
    //     if (vid && vid !== this.id) {
    //       this.presentAlertConfirm();
    //       return false;
    //     }
    //     console.log(this.foods[index]);

    //     this.calculate();
    //   } else {
    //     this.router.navigate(['login']);
    //   }
    // }).catch(error => {
    //   console.log(error);
    // });


  }
  addQ() {
    this.quantiy++;
  }
  removeQ() {
    if (this.quantiy > 0) {
      this.quantiy--;
    }
  }

  ionViewWillEnter() {
    // this.menuCtrl.enable(true, 'menu1');
    // this.menuCtrl.enable(false, 'menuAdmin');
    this.menuCtrl.enable(false, 'menu1');
    this.menuCtrl.enable(false, 'menuAdmin');

  }
}

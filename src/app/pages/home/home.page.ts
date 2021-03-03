import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { interval } from 'rxjs';
import { AddtocartPopupPage } from '../addtocart-popup/addtocart-popup.page';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  filtermonthwise: '';
  Categories: any[];
  name_en: any;
  data: any[];
  Data: any;
  NewOfferedData: any;
  newestItems: any;
  DiscountItemArray: any;
  discount_margin: [];
  dm: any;
  sliderConfig = {
    slidesPerView: 2.5,
    spaceBetween: 0
  }
  user_id: any;
  total_cart = '';
  randomNumber: Number;
  rad: Number;
  selling_price_id: any;
  package_name: any;
  selling_price_res: any;
  productPricing: any[];
  offerproductPricing: any[];
  product_discount: any;
  productPricingValue: any;
  offerproductPricingValue: any;
  NewProductPricing: any;
  gramValue: any;
  selectedIndex: number;
  convertedPrice: any;
  offerconvertedPrice: any;
  offergramValue: any;
  offerselling_price_id: any;
  offerselling_price_res: any;
  finalprice: any;
  final_selling_price_id: any;
  final_selling_price_res: any;
  final_product_discount: any;
  product_id: '';
  prcing_data = [];
  dropDownData: any;
  showData = false;
  showDatass = false;



  // Readable Address
  address: string;

  // Location coordinates
  latitude: number;
  longitude: number;
  accuracy: number;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };



  constructor(public nav: NavController,
    private authService: AuthService,
    public menuCtrl: MenuController,
    private loader: LoaderService,
    private router: Router,
    private modalController: ModalController,
    private toast: ToastService,
    private storageService: StorageService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) {
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
    setTimeout(() => {
      this.getCategories();

    }, 2000);
    this.BestSelling();
    this.DiscountedProductsHome();
    this.getCategories();
    // this.ProductDetails();

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

    this.getGeolocation();
  }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.BestSelling();
    this.DiscountedProductsHome();
    this.getCategories();
    setTimeout(() => {

      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  //Get current coordinates of device
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.accuracy = resp.coords.accuracy;

      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);

    }).catch((error) => {
      window.location.reload();
      // alert('Error getting location' + JSON.stringify(error));
    });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        // alert('Error getting location' + JSON.stringify(error));
        // window.location.reload();
      });
  }

  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }


  getCategories() {
    // this.loader.loadingPresent();
    this.authService.AllCategories().subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          // this.loader.loadingDismiss();
          this.Categories = res.result_AllCategories;

        }
        else {
          // this.loader.loadingDismiss();
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
  goToSearchPage() {
    this.nav.navigateForward("search");
  }
  goToCartPage() {
    this.nav.navigateForward("tabs/cart");
  }
  CategoriesChange(value: string) {

    this.name_en = value;  //It works well
    // this.locates = null; //it does not work
    console.log('Seleted Value => ' + JSON.stringify(value));
    // this.nav.navigateForward("products" );
    localStorage.setItem('catId', this.name_en.id);
    localStorage.setItem('name', this.name_en.name_en);
    this.router.navigateByUrl('category-product');
    // this.router.navigate(['products', this.name_en.name_en, this.name_en.id]);
    // this.selectedMunicipality = this.ubicacion.filter(item =>      item.departamento === value)
  }

  BestSelling() {
    // this.loader.loadingPresent();
    this.authService.BestSellingItemsHome('').subscribe(
      (res: any) => {
        // console.log(res);
        if (res.error === false) {
          // this.loader.loadingDismiss();
          this.data = res.result_BestSellingItemsHome;
          // console.log("this.data => " + JSON.stringify(this.data));

          for (let i = 0; i < res.result_BestSellingItemsHome.length; i++) {
            this.Data = res.result_BestSellingItemsHome[i];

            if (this.Data.product_pricing.length > 0) {

              this.productPricing = this.Data.product_pricing;
              // for (let ip = 0; ip < this.productPricing.length; ip++) {

              // }

              this.gramValue = this.productPricing[0];
              this.convertedPrice = this.productPricing[0].product_price_after_discount;
              this.selling_price_res = this.productPricing[0];
              this.selling_price_id = this.productPricing[i].id;
              // this.productPricingValue = this.productPricing[0];
              console.log('selling_price_id =>' + this.selling_price_id);
            }


            if (res.result_BestSellingItemsHome[i].product_pricing.length < 1) {
              console.log("False");
              // this.selling_price_res = [];
              res.result_BestSellingItemsHome[i].product_pricing.showData = false;
            }
            else {
              // this.selling_price_res = res.result_BestSellingItemsHome[i].product_pricing[0];
              console.log("True");
              res.result_BestSellingItemsHome[i].product_pricing.showData = true;
            }


          }

        }
        else {
          // this.loader.loadingDismiss();
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


  DiscountedProductsHome() {
    // this.loader.loadingPresent();
    this.authService.DiscountedProductsHome('').subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        if (res.error === false) {
          // this.loader.loadingDismiss();

          this.newestItems = res.result_DiscountedProductsHome;
          if (res.result_DiscountedProductsHome != []) {
          }


          this.discount_margin = res.result_DiscountedProductsHome.discount_margin;
          // console.log(JSON.stringify(res.result_DiscountedProductsHome[0].active_discount));
          this.dm = JSON.stringify(res.result_DiscountedProductsHome.discount_margin);


          for (let i = 0; i < this.newestItems.length; i++) {
            this.NewOfferedData = this.newestItems[i];
            this.DiscountItemArray = res.result_DiscountedProductsHome[i];
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
              // console.log('selling_price_id =>' + this.selling_price_id);
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
          }


        }
        else {
          // this.loader.loadingDismiss();
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



  goToProductDetail(id) {
    this.router.navigate(['product-detail/' + id]);

  }
  goToProduct(id, name) {
    localStorage.setItem('catId', id);
    localStorage.setItem('name', name);
    this.router.navigateByUrl('category-product');
  }

  goToProductPage() {
    this.router.navigateByUrl('all-products');
  }
  ProductPricingChange(value) {
    console.log('Seleted Value => ' + JSON.stringify(value));
    this.productPricingValue = value;
    this.convertedPrice = value.product_price_after_discount;
    this.selling_price_id = this.productPricingValue.id;
    this.selling_price_res = value;
  }

  OfferProductPricingChange(value) {
    console.log('Seleted Value => ' + JSON.stringify(value));
    this.offerproductPricingValue = value;
    this.offerconvertedPrice = value.product_price_after_discount;
    this.offerselling_price_id = this.offerproductPricingValue.id;
    this.offerselling_price_res = value;
  }
  async goToCart(id, price, name, pp) {


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

  ionViewWillEnter() {
    // this.menuCtrl.enable(true, 'menu1');
    // this.menuCtrl.enable(false, 'menuAdmin');
    console.log("KARAN CATID =>" + localStorage.getItem('catId'));

    this.menuCtrl.enable(true, 'menu1');
    this.menuCtrl.enable(false, 'menuAdmin');
    localStorage.removeItem('catId');
    localStorage.removeItem('price_min');
    localStorage.removeItem('price_max');
    localStorage.removeItem('BrandId');
    localStorage.removeItem('name');
    // window.location.reload();
  }

}

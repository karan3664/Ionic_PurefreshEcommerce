import { Component, OnInit, NgZone, ViewChildren, QueryList } from '@angular/core';

import { Platform, ModalController, MenuController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  userData$ = new BehaviorSubject<any>([]);
  public selectedIndex = 0;
  public counter = 0;
  showBtnLogin = true;
  currentUser: any;
  public authUser: any;
  Name = "";
  public appPages = [
    {
      title: 'Home',
      url: '/tabs/home',
      icon: 'home-outline',
      status: true
    },
    {
      title: 'All Products',
      url: '/all-products',
      icon: 'gift-outline',
      status: true
    },
    {
      title: 'My Wish List',
      url: '/wish-list',
      icon: 'heart-outline',
      status: true
    },
    {
      title: 'My Account',
      url: '/tabs/my-profile',
      icon: 'person-add-outline',
      status: true
    },
    {
      title: 'My Order',
      url: '/my-order',
      icon: 'file-tray-full-outline',
      status: true
    },
    {
      title: 'My Rewards',
      url: '/my-rewards',
      icon: 'cash-outline',
      status: true
    },
    {
      title: 'Wallet',
      url: '/wallet',
      icon: 'wallet-outline',
      status: true
    },
    {
      title: 'Change Password',
      url: '/changepassword',
      icon: 'key-outline',
      status: true
    },
    {
      title: 'About Us',
      url: '/about-us',
      icon: 'cog-outline',
      status: true
    },
    {
      title: 'Privacy Policy',
      url: '/privacy-policy',
      icon: 'settings-outline',
      status: true
    },
    {
      title: 'F A Q',
      url: '/faq',
      icon: 'chatbubbles-outline',
      status: true
    },
    {
      title: 'Terms & Conditions',
      url: '/termsandcondition',
      icon: 'newspaper-outline',
      status: true

    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  filtermonthwise: '';
  Categories: any;
  Brand: any;
  // public itemsHome: any = [];//home list
  public itemsCategory: any = [];//category list
  visibleCategory = false;//for category expand
  catId: any = [];

  public itemsBrand: any = [];//category list
  visibleBrand = false;//for category expand
  BrandId: any = [];
  // { sale: true, featured: false, img: "assets/images/item-images/20.jpg", name: "Rose Patel Shirt", price: "12.23", dPrice: "21.00", fav: false, res: true },
  // { sale: true, featured: true, img: "assets/images/item-images/25.jpg", name: "Flower Dresst", price: "14.64", dPrice: "31.00", fav: false, res: true },
  price_filter: any;



  public itemsPrice: any = [];//category list
  visiblePrice = false;//for category expand

  locationCoords: any;
  timetest: any;
  constructor(
    private platform: Platform,
    public menuCtrl: MenuController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public ngZone: NgZone,
    private authService: AuthService,
    public storageService: StorageService,
    private loader: LoaderService,
    private router: Router,
    private toastService: ToastService,
    private modalController: ModalController,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    public storage: Storage,


  ) {
    this.initializeApp();
    setTimeout(() => {
      this.checkLogin();
    }, 2000);
    // this.menuCtrl.enable(false, 'main2');
    // this.menuCtrl.enable(false, 'menuAdmin');
    //for category not expand by default
    this.price_filter =
      [
        {
          id: '0',
          min: "0",
          max: "99",
          select: false
        },

        {
          id: '1',
          min: "100",
          max: "199",
          select: false
        },
        {
          id: '2',
          min: "200",
          max: "299",
          select: false
        },
        {
          id: '3',
          min: "300",
          max: "399",
          select: false
        },
        {
          id: '4',
          min: "400",
          max: "499",
          select: false
        },
        {
          id: '5',
          min: "500",
          max: "599",
          select: false
        },
      ];
    // console.log('PriceFilter = > ' + JSON.stringify(this.price_filter));

    this.itemsCategory = [
      { expandedHelp: false },
    ];
    this.itemsBrand = [
      { expandedHelp: false },
    ];
    this.itemsPrice = [
      { expandedHelp: false },
    ];
    this.getCategories();
    this.ProductByCategory();

    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
    this.timetest = Date.now();

    this.checkGPSPermission();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString("548f14");

      this.platform.backButton.subscribe(() => {
        document.addEventListener("backbutton", () => {
          this.routerOutlets.forEach((outlet: IonRouterOutlet) => {


            if (outlet && outlet.canGoBack()) {
              outlet.pop();
            } else if (this.router.url === "/tabs") {
              navigator['app'].exitApp(); // work for ionic 4
            } else if (!outlet.canGoBack()) {
              navigator['app'].exitApp(); // work for ionic 4
            }
            else {
              window.history.back();
            }
          });
        });
      });
      // this.platform.backButton.subscribe(() => {
      //   if (this.counter === 0) {
      //     this.counter++;
      //     this.toastService.presentToast('Press BACK again to EXIT');
      //     setTimeout(() => { this.counter = 0; }, 3000);
      //   } else {
      //     // console.log("exitapp");
      //     // this.platform.exitApp();
      //     navigator['app'].exitApp();
      //   }
      // });
    });
  }

  ngOnInit() {

    this.checkLogin();
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'menu1');
    this.menuCtrl.enable(false, 'menuAdmin');
  }

  //Check if application having GPS access permission  
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        // alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              // alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      // error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
    }).catch((error) => {
      // alert('Error getting location' + error);
    });
  }
  //for category expandable
  expandItemCategory(item): void {
    console.log(item)
    this.visibleCategory = !this.visibleCategory;
    if (item.expandedHelp) {
      item.expandedHelp = false;
    } else {
      this.itemsCategory.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  //for Brand expandable
  expandItemBrand(item): void {
    console.log(item)
    this.visibleBrand = !this.visibleBrand;
    if (item.expandedHelp) {
      item.expandedHelp = false;
    } else {
      this.itemsBrand.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  //for Price expandable
  expandItemPrice(item): void {
    console.log(item)
    this.visiblePrice = !this.visiblePrice;
    if (item.expandedHelp) {
      item.expandedHelp = false;
    } else {
      this.itemsPrice.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }



  checkEvent(item, name_en) {

    this.catId.push(item);

    console.log(this.catId.toString());
    localStorage.setItem('catId', this.catId.toString());

    // this.router.navigate(['products', name_en, this.catId.toString()]);
    this.router.navigateByUrl('all-products').then(e => {
      this.router.navigateByUrl('products');
    });
  }



  getCategories() {
    // this.loader.loadingPresent();
    this.authService.AllCategories().subscribe(
      (res: any) => {
        // console.log(res);
        if (res.error === false) {
          // this.loader.loadingDismiss();
          this.Categories = res.result_AllCategories;

        }
        else {
          // this.loader.loadingDismiss();
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


  ProductByCategory() {

    const params = {
      page: '',
      sortBy: '',
      MinPrice: '',
      MaxPrice: '',
      CategoryIds: '',
      BrandId: '',
      Text: '',
      location_id: ''
    }
    this.authService.Products(JSON.stringify(params)).subscribe(
      (res: any) => {
        // console.log('Brands => ' + JSON.stringify(res));
        if (res.error === false) {
          this.Brand = res.result_products.brands;



        }
        else {

          this.toastService.presentToast(res.msg);
        }

      },
      (error: any) => {
        this.toastService.presentToast('Network Issue');
      }
    );
    // this.postData.Suppliers = JSON.stringify(this.data['to_name']);
  }


  checkEventBrand(item, name_en) {

    this.BrandId.push(item);

    console.log(this.catId.toString());
    localStorage.setItem('BrandId', this.BrandId.toString());

    // this.router.navigate(['products', name_en, this.BrandId.toString()]);

    this.router.navigateByUrl('all-products').then(e => {
      this.router.navigateByUrl('products');
    });

  }

  checkEventPrice(min, max) {
    localStorage.setItem('price_min', min);
    localStorage.setItem('price_max', max);
    // this.router.navigate(['products', '', '']);

    // localStorage.setItem('price_min', min);
    // localStorage.setItem('price_max', max);

    // this.navCtrl.navigateForward(['products']);
    // this.router.navigate(['products']);

    this.router.navigateByUrl('all-products').then(e => {
      this.router.navigateByUrl('products');
    });
  }

  checkLogin() {
    this.ngZone.run(() => {
      this.storageService.getData().then(val => {
        this.authUser = val;


        // console.log(val);
        if (!val) {
          // console.log(res);
          this.Name = "Guest"
          this.showBtnLogin = false;
          for (let i = 0; i < this.appPages.length; i++) {
            if (this.appPages[i].title === 'My Wish List') {
              this.appPages[i].status = false;
            }
            if (this.appPages[i].title === 'Change Password') {
              this.appPages[i].status = false;
            }
            if (this.appPages[i].title === 'My Order') {
              this.appPages[i].status = false;
            }
            if (this.appPages[i].title === 'My Account') {
              this.appPages[i].status = false;
            }
          }
        } else {
          this.Name = val.result_FrontLogin.name;
          this.showBtnLogin = true;
          for (let i = 0; i < this.appPages.length; i++) {
            if (this.appPages[i].title === 'My Wish List') {
              this.appPages[i].status = true;
            }
            if (this.appPages[i].title === 'Change Password') {
              this.appPages[i].status = true;
            }
            if (this.appPages[i].title === 'My Order') {
              this.appPages[i].status = true;
            }
            if (this.appPages[i].title === 'My Account') {
              this.appPages[i].status = true;
            }
          }
          // this.userService.user_id = val.id;

        }
      })
    });


  }


  logout() {
    // this.authService.logout();
    console.log('LOGOUT');

    this.storage.clear();

    this.userData$.next('');
    localStorage.clear();

    this.Name = "Guest"
    for (let i = 0; i < this.appPages.length; i++) {
      if (this.appPages[i].title === 'My Wish List') {
        this.appPages[i].status = false;
      }
      if (this.appPages[i].title === 'Change Password') {
        this.appPages[i].status = false;
      }
      if (this.appPages[i].title === 'My Order') {
        this.appPages[i].status = false;
      }
      if (this.appPages[i].title === 'My Account') {
        this.appPages[i].status = false;
      }
    }
    this.showBtnLogin = false;
    // window.location.reload();
    this.router.navigateByUrl('tabs');
  }

  async Login() {
    const modal = await this.modalController.create({
      component: LoginPage,
      componentProps: {
        'home': 'home',
        // 'dc_id': '',
        // 'to_user_id': ''
      }
    });
    modal.onDidDismiss()
      .then((data) => {

        const user = data['data']; // Here's your selected user!
        // console.log("Token =>" + user);
        // this.toke = user;
        window.location.reload();
      });
    return await modal.present();
  }


  Reset() {

    localStorage.clear();
    window.location.reload();
  }

}
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$ = new BehaviorSubject<any>([]);
  constructor(private httpService: HttpService,
    public nav: NavController,
    public storage: Storage,
    private storageService: StorageService) { }
  getUserData() {
    this.storageService.getData().then(res => {
      this.userData$.next(res);
    });
  }
  AllCategories(): Observable<any> {
    return this.httpService.post('AllCategories', '');
  }

  AllSliders(): Observable<any> {
    return this.httpService.post('AllSliders', '');
  }

  BestSellingItemsHome(postdata): Observable<any> {
    return this.httpService.post('BestSellingItemsHome', postdata);
  }
  DiscountedProductsHome(postdata): Observable<any> {
    return this.httpService.post('DiscountedProductsHome', postdata);
  }

  Products(postdata): Observable<any> {
    return this.httpService.post('Products', postdata);
  }
  GetProductDetails(postdata): Observable<any> {
    return this.httpService.post('GetProductDetails', postdata);
  }
  AddToWishList(posdata): Observable<any> {
    return this.httpService.post('AddToWishList', posdata);
  }
  remove_product_from_wishlist(posdata): Observable<any> {
    return this.httpService.post('remove_product_from_wishlist', posdata);
  }

  MyWishList(posdata): Observable<any> {
    return this.httpService.post('MyWishList', posdata);
  }

  FrontLogin(posdata): Observable<any> {
    return this.httpService.post('FrontLogin', posdata);
  }
  FrontRegister(posdata): Observable<any> {
    return this.httpService.post('FrontRegister', posdata);
  }
  AddToCart(posdata): Observable<any> {
    return this.httpService.post('AddToCart', posdata);
  }
  MyCartItems(posdata): Observable<any> {
    return this.httpService.post('viewCart', posdata);
  }
  remove_product_from_cart(posdata): Observable<any> {
    return this.httpService.post('remove_product_from_cart', posdata);
  }
  update_cart(posdata): Observable<any> {
    return this.httpService.post('update_cart', posdata);
  }
  checkout(posdata): Observable<any> {
    return this.httpService.post('checkout', posdata);
  }
  MakeDefault(posdata): Observable<any> {
    return this.httpService.post('MakeDefault', posdata);
  }
  StateList(posdata): Observable<any> {
    return this.httpService.post('StateList', posdata);
  }
  store_shipping_address(posdata): Observable<any> {
    return this.httpService.post('store_shipping_address', posdata);
  }
  changePassword(posdata): Observable<any> {
    return this.httpService.post('changePassword', posdata);
  }
  MyOrders(posdata): Observable<any> {
    return this.httpService.post('MyOrders', posdata);
  }
  viewProfile(posdata): Observable<any> {
    return this.httpService.post('viewProfile', posdata);
  }
  updateProfile(posdata): Observable<any> {
    return this.httpService.post('updateProfile', posdata);
  }
  update_shipping_address(id, posdata): Observable<any> {
    return this.httpService.post('update_shipping_address/' + id, posdata);
  }
  view_shipping_address(id): Observable<any> {
    return this.httpService.get('view_shipping_address/' + id);
  }
  HomePageSettings(posdata): Observable<any> {
    return this.httpService.post('HomePageSettings', posdata);
  }
  CheckoutCashOnDelivery(posdata): Observable<any> {
    return this.httpService.post('CheckoutCashOnDelivery', posdata);
  }
  ProductsAutoComplete(posdata): Observable<any> {
    return this.httpService.post('ProductsAutoComplete', posdata);
  }
  TurmsAndCondition(): Observable<any> {
    return this.httpService.get('TurmsAndCondition');
  }
  PrivacyPolicy(): Observable<any> {
    return this.httpService.get('PrivacyPolicy');
  }
  AboutUs(): Observable<any> {
    return this.httpService.get('AboutUs');
  }
  FAQ(): Observable<any> {
    return this.httpService.post('FAQ', '');
  }
  ForgetPassword(posdata): Observable<any> {
    return this.httpService.post('ForgetPassword', posdata);
  }
  VerifyOtp(posdata): Observable<any> {
    return this.httpService.post('VerifyOtp', posdata);
  }
  UpdatePassword(posdata): Observable<any> {
    return this.httpService.post('UpdatePassword', posdata);
  }

  ViewOrder(id): Observable<any> {
    return this.httpService.get('ViewOrder/' + id);
  }

  RateProduct(posdata): Observable<any> {
    return this.httpService.post('RateProduct', posdata);
  }
  ReviewProduct(posdata): Observable<any> {
    return this.httpService.post('ReviewProduct', posdata);
  }

  ApplyCoupon(posdata): Observable<any> {
    return this.httpService.post('ApplyCoupon', posdata);
  }
  RemoveCoupon(posdata): Observable<any> {
    return this.httpService.post('RemoveCoupon', posdata);
  }

  CheckForExtraDiscount(posdata): Observable<any> {
    return this.httpService.post('CheckForExtraDiscount', posdata);
  }
  UserRewardPointsHistory(id): Observable<any> {
    return this.httpService.get('UserRewardPointsHistory/' + id);
  }
  logout() {
    this.storage.clear();
    // this.storageService.removeStorageItem(AuthConstants.AUTHWelcome).then(res => {
    //   this.welcomeData$.next('');
    // });
    // this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
    this.userData$.next('');
    localStorage.clear();
    // this.router.navigate(['']);
    this.nav.navigateRoot('tabs');
    // });
  }
}


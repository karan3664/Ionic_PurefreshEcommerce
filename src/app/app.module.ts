import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from '././components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { LoginPageModule } from './pages/login/login.module';
import { LoginPage } from './pages/login/login.page';
import { AddAddressPage } from './pages/add-address/add-address.page';
import { AddAddressPageModule } from './pages/add-address/add-address.module';
import { MenuComponentComponent } from './components/menu-component/menu-component.component';
import { ProductsPageModule } from './pages/products/products.module';
import { HomePage } from './pages/home/home.page';
import { HomePageModule } from './pages/home/home.module';
import { RegisterPage } from './pages/register/register.page';
import { ForgotpasswordPage } from './pages/forgotpassword/forgotpassword.page';
import { RegisterPageModule } from './pages/register/register.module';
import { ForgotpasswordPageModule } from './pages/forgotpassword/forgotpassword.module';
import { AddtocartPopupPage } from './pages/addtocart-popup/addtocart-popup.page';
import { AddtocartPopupPageModule } from './pages/addtocart-popup/addtocart-popup.module';
import { EditAddressPage } from './pages/edit-address/edit-address.page';
import { EditAddressPageModule } from './pages/edit-address/edit-address.module';
import { WritereviewPage } from './pages/writereview/writereview.page';
import { WritereviewPageModule } from './pages/writereview/writereview.module';
import { IonicRatingModule } from 'ionic-rating';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { CouponPage } from './pages/coupon/coupon.page';
import { CouponPageModule } from './pages/coupon/coupon.module';

@NgModule({
  declarations: [AppComponent, MenuComponentComponent],
  entryComponents: [LoginPage, AddtocartPopupPage, EditAddressPage, WritereviewPage,
    AddAddressPage, RegisterPage, ForgotpasswordPage, CouponPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    ComponentsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    LoginPageModule,
    RegisterPageModule,
    ForgotpasswordPageModule,
    AddtocartPopupPageModule,
    AddAddressPageModule,
    WritereviewPageModule,
    IonicRatingModule,
    EditAddressPageModule,
    CouponPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

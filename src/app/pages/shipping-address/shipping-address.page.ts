import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController, IonRadioGroup } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { LoginPage } from '../login/login.page';
import { AddAddressPage } from '../add-address/add-address.page';
import { EditAddressPage } from '../edit-address/edit-address.page';
@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.page.html',
  styleUrls: ['./shipping-address.page.scss'],
})
export class ShippingAddressPage implements OnInit {
  @ViewChild('radioGroup', { static: false }) radioGroup: IonRadioGroup
  rad: Number;
  Name: '';
  Mobile: '';
  Address: '';
  user_id: any;
  Data: any;
  selectedRadioGroup: any;
  selectedRadioItem: any;
  defaultSelectedRadio = '';
  address_id = '';
  default: any;
  constructor(private route: ActivatedRoute,
    private modalController: ModalController,
    public alertController: AlertController,
    public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    private socialSharing: SocialSharing,
    private storageService: StorageService) {


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
      this.ShippingDetails();
      this.storageService.getRandomNumber().then((val) => {
        if (val) {
          this.rad = val;

        }
        else {

        }

      });
    }, 1000);


  }

  ngOnInit() {
  }



  ionViewWillEnter() {
    // this.default = true;
  }


  MakeDefault(event) {
    this.address_id = JSON.stringify(event.detail.value.id);
    // this.default = JSON.stringify(event.detail.value.default);
    console.log("radioGroupChange", JSON.stringify(event.detail.value.default));
    const data = {
      address_id: JSON.stringify(event.detail.value.id),
      user_id: event.detail.value.front_user_id
    }
    // this.nav.navigateForward("cart");

    console.log('My MakeDefault => ' + JSON.stringify(data));
    this.loader.loadingPresent();

    this.authService.MakeDefault(data).subscribe(
      (res: any) => {
        console.log('My Defauly => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();
          // console.log('My shipping_addresses 2 => ' + JSON.stringify(res.result_checkout.shipping_addresses));


          this.toastService.presentToast(res.msg);

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


  async AddAddress() {
    const modal = await this.modalController.create({
      component: AddAddressPage,
      componentProps: {
        // 'po_id': '',
        // 'dc_id': '',
        // 'to_user_id': ''
      }
    });
    modal.onDidDismiss()
      .then((data) => {

        const user = data['data']; // Here's your selected user!
        // console.log("Token =>" + user);
        // this.toke = user;
        // window.location.reload();
        this.ShippingDetails();
      });
    return await modal.present();
  }

  ShippingDetails() {
    const data = {
      session_id: this.rad,
      user_id: this.user_id
    }
    // this.nav.navigateForward("cart");

    console.log('My shipping_addresses => ' + JSON.stringify(data));
    this.loader.loadingPresent();

    this.authService.checkout(data).subscribe(
      (res: any) => {
        console.log('My shipping_addresses => ' + JSON.stringify(res.result_checkout.shipping_addresses));
        if (res.error === false) {
          this.loader.loadingDismiss();
          // console.log('My shipping_addresses 2 => ' + JSON.stringify(res.result_checkout.shipping_addresses));

          this.Data = res.result_checkout.shipping_addresses;
          console.log("UserID==>", this.Data);

          for (let i = 0; i < this.Data.length; i++) {
            // this.default = res.result_checkout.shipping_addresses[index].default;
            if (this.Data[i].default == 1) {
              this.default = res.result_checkout.shipping_addresses[i];
              this.address_id = res.result_checkout.shipping_addresses[i].id;
            }
            else {
              // this.default = 0;
            }


          }

          console.log(this.default);

        }
        else {
          this.loader.loadingDismiss();
          this.toastService.presentToast(res);
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
  SelectPayment() {
    if (this.address_id == '') {
      this.toastService.presentToast('Select Default Address');

    }
    else {
      this.nav.navigateForward("payment-method");
    }


  }
  showValue(event) {
    console.log("radioSelect", event.detail.value);
    // this.selectedRadioItem = event.detail;
  }
  async Edit(id) {
    console.log(id);

    const modal = await this.modalController.create({
      component: EditAddressPage,
      componentProps: {
        'id': id,
        // 'dc_id': '',
        // 'to_user_id': ''
      }
    });
    modal.onDidDismiss()
      .then((data) => {

        const user = data['data']; // Here's your selected user!
        // console.log("Token =>" + user);
        this.ShippingDetails();
        // window.location.reload();
      });

    return await modal.present();
  }
}

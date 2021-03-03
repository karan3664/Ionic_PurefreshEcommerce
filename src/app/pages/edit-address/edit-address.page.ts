import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  @Input() id: string;
  StateListItem: any;
  filtermonthwise: any;
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
  state: any;
  constructor(private route: ActivatedRoute,
    private modalController: ModalController,
    public alertController: AlertController,
    public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    public navParams: NavParams,
    private storageService: StorageService) {
    this.id = this.navParams.data.id;
    this.storageService.getData().then((val) => {
      if (val) {
        this.postData.user_id = val.result_FrontLogin.id;
      }
      else {
        this.postData.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });
    setTimeout(() => {
      //code for your new value.
      this.GetStateList();
      this.ViewAddress();
    });

  }

  ngOnInit() {
  }


  GetStateList() {


    // this.loader.loadingPresent();

    this.authService.StateList('').subscribe(
      (res: any) => {
        console.log('My shipping_addresses => ' + JSON.stringify(res.result_StateList));
        if (res.error === false) {
          // this.loader.loadingDismiss();

          this.StateListItem = res.result_StateList;

        }
        else {
          // this.loader.loadingDismiss();
          this.toastService.presentToast(res.msg);
        }

      },
      (error: any) => {
        // this.loader.loadingDismiss();
        if (JSON.stringify(error.error.errors) != null) {
            this.toastService.presentToast(JSON.stringify(error.error.errors));
          }
          else {
            this.toastService.presentToast("Network Issue...");
          }
      }
    );

  }

  StateList(value) {
    console.log("Selected State => " + JSON.stringify(value));
    this.state = value;
  }

  SaveAddress() {
    const data = {
      user_id: this.postData.user_id,
      name: this.postData.name,
      mobile: this.postData.mobile_number,
      shipping_email: this.postData.email,
      pincode: this.postData.pincode,
      locality: this.postData.locality,
      address: this.postData.address,
      city: this.postData.city,
      state: this.state,
      lang_mark: this.postData.landmark,
      alternate_phone: this.postData.alt_phone
    }

    console.log("Save Address => " + JSON.stringify(data));

    this.loader.loadingPresent();

    this.authService.update_shipping_address(this.id, data).subscribe(
      (res: any) => {
        console.log('My store_shipping_address => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();

          this.toastService.presentToast(res.msg);

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

  ViewAddress() {

    this.loader.loadingPresent();

    this.authService.view_shipping_address(this.id).subscribe(
      (res: any) => {
        console.log('My store_shipping_address => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();

          this.postData.name = res.result_view_shipping_address.name;
          this.postData.mobile_number = res.result_view_shipping_address.mobile;
          this.postData.email = res.result_view_shipping_address.email;
          this.postData.pincode = res.result_view_shipping_address.pincode;
          this.postData.locality = res.result_view_shipping_address.locality;
          this.postData.address = res.result_view_shipping_address.address;
          this.state = res.result_view_shipping_address.state;
          this.postData.landmark = res.result_view_shipping_address.lang_mark;
          this.postData.alt_phone = res.result_view_shipping_address.alternate_phone;
          this.postData.city = res.result_view_shipping_address.city;


          // this.toast.presentToast(res.msg);

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
  async closeModal() {
    await this.modalController.dismiss();
  }
}
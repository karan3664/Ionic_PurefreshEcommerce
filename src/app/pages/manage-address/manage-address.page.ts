import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController, PopoverController, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { AddAddressPage } from '../add-address/add-address.page';
import { EditAddressPage } from '../edit-address/edit-address.page';
@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.page.html',
  styleUrls: ['./manage-address.page.scss'],
})
export class ManageAddressPage implements OnInit {

  id: any;
  user_id: any;
  rad: Number;

  myaddress: any[] = [];
  from: any;
  selectedAddress: any;
  dummy = Array(10);
  constructor(
    private router: Router,
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    private storageService: StorageService,
    private navCtrl: NavController,
    private modalController: ModalController,

    private route: ActivatedRoute,
    private popoverController: PopoverController
  ) {
    this.storageService.getRandomNumber().then((val) => {
      if (val) {
        this.rad = val;
      }
      else {

      }

    });

    this.storageService.getData().then((val) => {
      if (val) {
        this.user_id = val.result_FrontLogin.id;
        this.ShippingDetails();
      }
      else {
        this.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }
    });
  }

  ngOnInit() {
    // this.route.queryParams.subscribe(data => {
    //   console.log(data);
    //   if (data && data.from) {
    //     this.from = data.from;
    //   }
    // });
  }

  ShippingDetails() {
    const data = {
      session_id: this.rad,
      user_id: this.user_id
    }
    // this.nav.navigateForward("cart");

    console.log('My shipping_addresses => ' + JSON.stringify(data));
    // this.loader.loadingPresent();

    this.authService.checkout(data).subscribe(
      (res: any) => {
        console.log('My shipping_addresses => ' + JSON.stringify(res.result_checkout.shipping_addresses));
        this.dummy = [];
        if (res.error === false) {
          // this.loader.loadingDismiss();
          // console.log('My shipping_addresses 2 => ' + JSON.stringify(res.result_checkout.shipping_addresses));

          this.myaddress = res.result_checkout.shipping_addresses;


        }
        else {
          // this.loader.loadingDismiss();.
          this.dummy = [];
          this.toastService.presentToast(res);
        }

      },
      (error: any) => {
        this.dummy = [];
        // this.loader.loadingDismiss();
        if (JSON.stringify(error.error.errors) != null) {
          this.toastService.presentToast(JSON.stringify(error.error.errors));
        }
        else {
          this.dummy = [];
          this.toastService.presentToast("Network Issue...");
        }
      }
    );

  }
  // getAddress() {
  //   this.api.getMyAddress(this.id).then((data) => {
  //     console.log('my address', data);
  //     this.dummy = [];
  //     if (data && data.length) {
  //       this.myaddress = data;
  //     }
  //   }, error => {
  //     console.log(error);
  //     this.dummy = [];
  //   }).catch(error => {
  //     console.log(error);
  //     this.dummy = [];
  //   });
  // }

  ionViewWillEnter() {
    // this.ShippingDetails();
    // this.api.checkAuth().then((data: any) => {
    //   console.log(data);
    //   if (data) {
    //     this.id = data.uid;
    //     this.getAddress();
    //   }
    // });
  }

  async addNew() {
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
        this.ShippingDetails();
      });
    return await modal.present();
  }

  async openMenu(item, events) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: events,
      mode: 'ios',
    });
    popover.onDidDismiss().then(async data => {
      console.log(data.data);
      if (data && data.data) {
        if (data.data === 'edit') {
          const navData: NavigationExtras = {
            queryParams: {
              from: 'edit',
              data: JSON.stringify(item)
            }
          };
          const modal = await this.modalController.create({
            component: EditAddressPage,
            componentProps: {
              'id': item.id,
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
          // this.router.navigate(['add-new-address'], navData);
        } else if (data.data === 'delete') {
          console.log(item);
          Swal.fire({
            title: 'Are you sure?',
            text: 'to delete this address',
            icon: 'question',
            confirmButtonText: 'Yes',
            backdrop: false,
            background: 'white',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'cancel'
          }).then(data => {
            console.log(data);
            this.ShippingDetails();
          });

        }
      }
    });
    await popover.present();
  }
}

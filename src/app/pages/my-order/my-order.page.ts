import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss'],
})
export class MyOrderPage implements OnInit {

  isItemAvailable: boolean = false;
  data: any[];
  user_id: any;


  constructor(private authService: AuthService,
    public storageService: StorageService,
    private route: Router,
    public menuCtrl: MenuController,
    private loader: LoaderService,
    private toast: ToastService) {
    this.storageService.getData().then((val) => {
      if (val) {
        this.user_id = val.result_FrontLogin.id;
        this.getMyOrder();
      }
      else {
        this.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });

  }

  ngOnInit() {
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.getMyOrder();
    setTimeout(() => {
      // 
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getMyOrder() {
    this.loader.loadingPresent();
    const data = {
      user_id: this.user_id
    }
    console.log(JSON.stringify(data));
    this.authService.MyOrders(data).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));

        if (res.error === false) {
          this.loader.loadingDismiss();

          this.data = res.result_MyOrders;


        }
        else {
          this.toast.presentToast(res.msg);
        }


      },
      (error: any) => {

        this.loader.loadingDismiss();
        this.toast.presentToast('Network Issue');
      }

    );
  }
  ViewInvoice(id) {
    console.log('Karan=>' + id);
    localStorage.setItem('myorderid', id);
    this.route.navigate(['/view-invoice']);
  }

  Delete(id) {

  }

  ionViewWillEnter() {
    // this.menuCtrl.enable(true, 'menu1');
    // this.menuCtrl.enable(false, 'menuAdmin');
    this.menuCtrl.enable(true, 'menu1');
    this.menuCtrl.enable(false, 'menuAdmin');

  }
}

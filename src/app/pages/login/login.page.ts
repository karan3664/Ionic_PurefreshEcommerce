import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RegisterPage } from '../register/register.page';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  postData = {
    username: '',
    password: ''
  };
  randomNumber: Number;
  rad: Number;
  constructor(private modalController: ModalController,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    private loader: LoaderService,
    public alertController: AlertController,
    public navCtrl: NavController) {
    setTimeout(() => {
      this.storageService.getRandomNumber().then((val) => {
        if (val) {
          this.rad = val;
        }
        else {
          // this.rad = this.randomNumber;
          // this.storageService.setRandomNumber(this.randomNumber);

        }

      });
    }, 500);
  }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  validateInputs() {
    const username = this.postData.username.trim();
    const password = this.postData.password.trim();
    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  formLogin() {
    if (this.validateInputs()) {
      this.loader.loadingPresent();
      console.log(this.postData);


      const value = {
        email: this.postData.username,
        password: this.postData.password,
        old_session: this.rad
      };
      console.log(JSON.stringify(value));
      // this.loader.loadingPresent();
      this.authService.FrontLogin(value).subscribe(
        async (res: any) => {
          console.log('Login Data =>' + JSON.stringify(res));
          if (res.error === false) {
            this.loader.loadingDismiss();
            // Storing the User data.
            // this.storageService.store(AuthConstants.AUTH, res.logindata);

            this.storageService.setData(res);
            this.randomNumber = Math.random();
            // this.rad = this.randomNumber;
            localStorage.setItem('token', res.result_FrontLogin.id);
            this.storageService.setRandomNumber(this.randomNumber);

           
            // localStorage.setItem('token', res.token);
            await this.modalController.dismiss();

          } else {
            this.loader.loadingDismiss();
            this.toastService.presentToast(res['msg']);
          }
        },
        (error: any) => {
          this.loader.loadingDismiss();
          this.toastService.presentToast('Network Issue.');
        }
      );
    } else {
      this.loader.loadingDismiss();
      this.toastService.presentToast('Please enter username or password.');
    }
  }
  async Register() {
    const modal = await this.modalController.create({
      component: RegisterPage,
      componentProps: {
        // 'po_id': this.product_id,
        // 'dc_id': '',
        // 'to_user_id': ''
      }
    });

    // modal.onDidDismiss()
    //   .then((data) => {

    //     const user = data['data']; // Here's your selected user!
    //     console.log("Token =>" + user);
    //     this.toke = user;
    //     window.location.reload();
    //   });

    return await modal.present();
  }

  async goToForgot() {
    let modal = await this.modalController.create({
      component: ForgotpasswordPage,
      componentProps: {
        'hideGuestLogin': true
      }
    });
    return await modal.present();
  }
}

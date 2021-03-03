import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  postData = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };
  constructor(private modalController: ModalController,
    private authService: AuthService,
    private toastService: ToastService,
    private loader: LoaderService
  ) { }

  ngOnInit() {
  }
  async closeModal() {
    await this.modalController.dismiss();
  }

  validateInputs() {
    const name = this.postData.name.trim();
    const email = this.postData.email.trim();
    const password = this.postData.password.trim();
    const con_password = this.postData.password_confirmation.trim();
    return (
      this.postData.name &&
      this.postData.email &&
      this.postData.password &&
      this.postData.password_confirmation &&


      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      con_password.length > 0
    );
  }

  formLogin() {
    if (this.validateInputs()) {
      this.loader.loadingPresent();
      console.log(this.postData);


      const value = {
        name: this.postData.name,
        email: this.postData.email,
        password: this.postData.password,
        password_confirmation: this.postData.password_confirmation
      };
      console.log(JSON.stringify(value));
      // this.loader.loadingPresent();
      this.authService.FrontRegister(value).subscribe(
        async (res: any) => {
          console.log('Login Data =>' + JSON.stringify(res));
          if (res.error === false) {
            this.loader.loadingDismiss();
            // Storing the User data.
            // this.storageService.store(AuthConstants.AUTH, res.logindata);


            await this.modalController.dismiss();
            // localStorage.setItem('token', res.token);


          } else {
            this.loader.loadingDismiss();
            this.toastService.presentToast(res['msg']);
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
    } else {
      this.loader.loadingDismiss();
      this.toastService.presentToast('All Fields are required');
    }
  }

}

import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) {}
  async presentToast(infoMessage: string) {
    const toast = await this.toastController.create({
    message: infoMessage,
    duration: 2000,
    color: 'light',
    position: 'top',
    // cssClass: 'toast',
    translucent: false,
    animated: true,
    mode: "ios"
    });
    toast.present();
    }

}

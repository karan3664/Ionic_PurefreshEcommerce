import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addtocart-popup',
  templateUrl: './addtocart-popup.page.html',
  styleUrls: ['./addtocart-popup.page.scss'],
})
export class AddtocartPopupPage implements OnInit {

  constructor( private modalController: ModalController,) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}

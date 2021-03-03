import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  paymentMethods = ["Direct bank transfer", "Cash on delivery"];
  constructor() { }

  ngOnInit() {
  }

}

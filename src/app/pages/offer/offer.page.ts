import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { interval } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  total_cart = '';
  constructor(private storageService: StorageService,
    public nav: NavController,) {
    interval(100).subscribe(x => {
      this.storageService.getCartCount().then((val) => {
        if (val) {
          this.total_cart = val;
        }
        else {
          this.total_cart = '0';

        }

      });
    });
   }

  ngOnInit() {
  }

  goToSearchPage() {
    this.nav.navigateForward("search");
  }
  goToCartPage() {
    this.nav.navigateForward("cart");
  }
}

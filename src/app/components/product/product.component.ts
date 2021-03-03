import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input('data') p;//product data

  BestSellingItems: any[];

  constructor(public nav: NavController,
    public router: Router,
    private authService: AuthService,
    private loader: LoaderService,
    private toast: ToastService) { }

  ngOnInit() { }

  BestSelling() {
    // this.loader.loadingPresent();
    this.authService.BestSellingItemsHome('').subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          // this.loader.loadingDismiss();
          this.BestSellingItems = res.result_BestSellingItemsHome;

        }
        else {
          // this.loader.loadingDismiss();
          this.toast.presentToast(res.msg);
        }

      },
      (error: any) => {
        this.loader.loadingDismiss();
        this.toast.presentToast('Network Issue');
      }
    );
    // this.postData.Suppliers = JSON.stringify(this.data['to_name']);
  }
  goToProductDetail(id) {
    // this.nav.navigateForward("product-detail/", id);
    this.router.navigate(["product-detail/", id]);
  }

  //icon funtion for wishlist
  async onIconClick(i) {
    const data = {
      user_id: '1',
      product_id: this.p.id

    }
    if (i.fav != true) {
      i.fav = true;
      this.authService.AddToWishList(data).subscribe(
        (res: any) => {
          console.log(res);
          if (res.error === false) {
            // this.loader.loadingDismiss();

            this.toast.presentToast('Added To Wish List!');
          }
          else {
            // this.loader.loadingDismiss();
            this.toast.presentToast(res.msg);
          }

        },
        (error: any) => {
          // this.loader.loadingDismiss();
          this.toast.presentToast('Network Issue');
        }
      );

    }
    else {
      i.fav = false;
      this.authService.remove_product_from_wishlist(data).subscribe(
        (res: any) => {
          console.log(res);
          if (res.error === false) {
            // this.loader.loadingDismiss();

            this.toast.presentToast('Removed From Wish List!');
          }
          else {
            // this.loader.loadingDismiss();
            this.toast.presentToast(res.msg);
          }

        },
        (error: any) => {
          // this.loader.loadingDismiss();
          this.toast.presentToast('Network Issue');
        }
      );
    }
  }
}


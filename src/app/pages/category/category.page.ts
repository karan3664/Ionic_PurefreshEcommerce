import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  Categories: any[];
  total_cart = '';

  constructor(private authService: AuthService,
    public menuCtrl: MenuController,
    public nav: NavController,
    private loader: LoaderService,
    private router: Router,
    private modalController: ModalController,
    private toast: ToastService,
    private storageService: StorageService,) {
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
    this.getCategories();
  }

  ngOnInit() {
  }

  getCategories() {
    // this.loader.loadingPresent();
    this.authService.AllCategories().subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          // this.loader.loadingDismiss();
          this.Categories = res.result_AllCategories;

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

  goToSearchPage() {
    this.nav.navigateForward("search");
  }
  goToCartPage() {
    this.nav.navigateForward("/tabs/cart");
  }
  goToProduct(id, name) {
    localStorage.setItem('catId', id);
    localStorage.setItem('name', name);
    this.router.navigateByUrl('category-product');
  }

  // goToProductPage() {
  //   this.router.navigate(['products']);
  // }
}

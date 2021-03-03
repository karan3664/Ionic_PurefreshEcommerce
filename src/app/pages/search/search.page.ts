import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { NavController } from '@ionic/angular';
import { interval } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  pageno = 1;
  pageLimit = 10000;
  data: any[] = [];
  FruitList: any;
  FruitList_temp: any;
  UnitList: any[];
  UnitList_temp: any;
  DataStatus: any;
  showFruitList: any;
  showUnitList: any;

  SelectedQty: any;
  SelectedFruit: any;
  total_cart: any;
  constructor(private authService: AuthService,
    private router: Router,
    private loader: LoaderService,
    public nav: NavController,
    public storageService: StorageService,
    private toast: ToastService) {
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
    this.getPORequest(false, "");
  }

  ngOnInit() {
  }

  getPORequest(isFirstLoad, event) {
    this.loader.loadingPresent();
    const data = {
      page: this.pageno,
      sortBy: '',
      MinPrice: '',
      MaxPrice: '',
      CategoryIds: '',
      BrandId: '',
      Text: '',
      location_id: '',
      limit: ''
    }
    this.authService.Products(data).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));

        if (res.error === false) {
          this.loader.loadingDismiss();
          this.FruitList = res.result_products.products.data;
          this.FruitList_temp = res.result_products.products.data;
          this.data.push(this.FruitList);
          // this.finalData = this.data;
          // this.UnitList = res.result_ProductsAutoCompleteForSupplier;
          // this.UnitList_temp = res.result_ProductsAutoCompleteForSupplier;
        }
        else {
          this.toast.presentToast(res.msg);
        }

        if (isFirstLoad)
          event.target.complete();
        this.pageno++;
      },
      (error: any) => {

        this.loader.loadingDismiss();
        this.toast.presentToast('Network Issue');
      }

    );
  }
  doInfinite(event) {
    this.getPORequest(true, event);
  }
  getItems(ev: any) {
    console.log(JSON.stringify(ev));
    // Reset items back to all of the items
    this.FruitList = this.FruitList_temp;
    this.data = [];
    const val = ev;
    console.log("Value " + val);

    if (val == undefined || val === null || val.trim() == '') {
      this.FruitList = this.FruitList_temp;
    } else if (val && val.trim() != '') {
      this.data = this.FruitList_temp.filter((item) => {
        return (item.product_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

      console.log("Size" + this.FruitList_temp.length);
      if (this.data.length == 0) {
        this.DataStatus = 1;
      } else {
        this.DataStatus = 0;
      }
    }
  }

  checkFocus(flag: any) {
    if (flag == 'icon') {
      this.showFruitList = !this.showFruitList;
      this.showUnitList = false;

    } else {
      this.showFruitList = true;
      this.showUnitList = false;

    }

  }
  checkFocus2(flag: any) {
    if (flag == 'icon') {
      this.showUnitList = !this.showUnitList;
      this.showFruitList = false;
    } else {
      this.showUnitList = true;
      this.showFruitList = false;
    }
  }

  setdata(data) {
    console.log(data)
    this.UnitList = [];
    this.SelectedFruit = data.product_name;
    this.SelectedQty = data.unit_name;
    this.UnitList.push(data);
    this.showFruitList = false;
    this.showUnitList = false;
  }

  setdata2(data) {
    this.UnitList = [];
    console.log(data)
    this.SelectedQty = data.unit_name;

    this.UnitList.push(data);
    this.showFruitList = false;
    this.showUnitList = false;
  }

  goToProductDetail(id) {
    this.router.navigate(["product-detail/", id]);
  }


  goToCartPage() {
    this.nav.navigateForward("cart");
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-new-filter-page',
  templateUrl: './new-filter-page.page.html',
  styleUrls: ['./new-filter-page.page.scss'],
})
export class NewFilterPagePage implements OnInit {
  product_id: ''
  constructor(private route: ActivatedRoute,
    public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private toast: ToastService,
    private socialSharing: SocialSharing,
    private storageService: StorageService) {
    this.product_id = this.route.snapshot.params['id']
    console.log(this.product_id);
  }

  ngOnInit() {
  }

}

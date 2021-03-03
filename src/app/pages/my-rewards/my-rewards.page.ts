import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-rewards',
  templateUrl: './my-rewards.page.html',
  styleUrls: ['./my-rewards.page.scss'],
})
export class MyRewardsPage implements OnInit {
  Data: any;
  user_id: any;

  constructor(private storageService: StorageService,
    private toastService: ToastService,
    private loader: LoaderService,
    private authService: AuthService,) {

    this.storageService.getData().then((val) => {
      if (val) {
        this.user_id = val.result_FrontLogin.id;
        this.UserRewardPointsHistory();

      }
      else {
        this.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });

  }

  ngOnInit() {
  }

  UserRewardPointsHistory() {
    this.loader.loadingPresent();
    this.authService.UserRewardPointsHistory(this.user_id).subscribe(
      async (res: any) => {
        console.log('Login Data =>' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();
          this.Data = res.result_UserRewardPointsHistory;

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

  }
}

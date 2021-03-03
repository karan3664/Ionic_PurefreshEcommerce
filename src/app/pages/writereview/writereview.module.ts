import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WritereviewPageRoutingModule } from './writereview-routing.module';

import { WritereviewPage } from './writereview.page';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicRatingModule,
    IonicModule,
    WritereviewPageRoutingModule
  ],
  declarations: [WritereviewPage]
})
export class WritereviewPageModule {}

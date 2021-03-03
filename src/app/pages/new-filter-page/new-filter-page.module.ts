import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewFilterPagePageRoutingModule } from './new-filter-page-routing.module';

import { NewFilterPagePage } from './new-filter-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewFilterPagePageRoutingModule
  ],
  declarations: [NewFilterPagePage]
})
export class NewFilterPagePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';
import { BannerComponent } from '../components/banner/banner.component';
import { ProductComponent } from './product/product.component';
import { BestofferviewhomeComponent } from './bestofferviewhome/bestofferviewhome.component';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  declarations: [BannerComponent, ProductComponent, PopoverComponent, BestofferviewhomeComponent],
  exports: [BannerComponent, ProductComponent, PopoverComponent, BestofferviewhomeComponent],

  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }

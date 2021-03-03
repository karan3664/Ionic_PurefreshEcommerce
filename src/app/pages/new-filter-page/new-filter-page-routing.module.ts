import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewFilterPagePage } from './new-filter-page.page';

const routes: Routes = [
  {
    path: '',
    component: NewFilterPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewFilterPagePageRoutingModule {}

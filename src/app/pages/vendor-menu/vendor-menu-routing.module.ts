import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorMenuPage } from './vendor-menu.page';

const routes: Routes = [
  {
    path: '',
    component: VendorMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorMenuPageRoutingModule {}

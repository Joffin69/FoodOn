import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDishPage } from './order-dish.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDishPageRoutingModule {}

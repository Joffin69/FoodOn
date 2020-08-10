import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDishPageRoutingModule } from './order-dish-routing.module';

import { OrderDishPage } from './order-dish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDishPageRoutingModule
  ],
  declarations: [OrderDishPage]
})
export class OrderDishPageModule {}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-order-dish',
  templateUrl: './order-dish.page.html',
  styleUrls: ['./order-dish.page.scss'],
})
export class OrderDishPage implements OnInit {
  cartArray = [];
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.cartArray = this.dataService.cartArray;
    this.setCartArray();
  }

  setCartArray() {
    if (this.cartArray.length >= 1) {
      for (const dish of this.cartArray) {
        dish.totalAmount = dish.itemsAdded * dish.price;
      }
    }
    console.log(this.cartArray);
  }

  // async loadDish(dish) {
  //   this.dish$ = this.dataService.getDish(dish);
  //   this.recommendedDishes$ = this.dataService.getRecommendedDishes();
  // }

  // async order() {
  //   //TODO Move to checkout page and collect money.
  //   let toast = await this.toast.create({
  //     message: "Order Placed Successfully.",
  //     color: 'primary',
  //     duration: 3000
  //   });
  //   toast.present();
  // }




}

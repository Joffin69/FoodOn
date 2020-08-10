import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-order-dish',
  templateUrl: './order-dish.page.html',
  styleUrls: ['./order-dish.page.scss'],
})
export class OrderDishPage implements OnInit {
  dish$: Observable<any>;
  amount: Number;
  recommendedDishes$: Observable<any>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService: DataService, private toast: ToastController) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(param => {
      if (!param.id) {
        return this.router.navigate(["tabs"]);
      }
      this.loadDish(param.id);
    })

  }

  async loadDish(dish) {
    this.dish$ = this.dataService.getDish(dish);
    this.recommendedDishes$ = this.dataService.getRecommendedDishes();
  }

  async order() {
    //TODO Move to checkout page and collect money.
    let toast = await this.toast.create({
      message: "Order Placed Successfully.",
      color: 'primary',
      duration: 3000
    });
    toast.present();
  }




}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-dish',
  templateUrl: './order-dish.page.html',
  styleUrls: ['./order-dish.page.scss'],
})
export class OrderDishPage implements OnInit {
  cartArray = [
    // {fId: 'PP001',
    //  name: 'Fish Pulimunchi',
    //  itemsAdded: 2,
    //  price: 110,
    //  totalAmount: 0},
    //  {fId: 'PCB01',
    //  name: 'Chicken Biriyani',
    //  itemsAdded: 1,
    //  price: 110,
    //  totalAmount: 0}
  ];
  textReq = false;
  textInput = '';
  totalAmount = 0;
  taxAmount = 0;
  finalAmount = 0;
  orders: any;
  orderSub: Subscription;

  constructor(private dataService: DataService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.dataService.getAllOrders();
    this.orderSub = this.dataService.getOrdersUpdateListener()
    .subscribe((ordersList: {orders: any}) => {
      this.orders = ordersList.orders;
    });
    this.cartArray = this.dataService.cartArray;
    this.setCartArray();
  }

  setCartArray() {
    if (this.cartArray.length >= 1) {
      for (const dish of this.cartArray) {
        dish.totalAmount = dish.itemsAdded * dish.price;
      }
    }
    this.calculateAmountToPay();
  }

  calculateAmountToPay() {
    this.totalAmount = this.cartArray.reduce((amount, dish) => {
      amount = amount + dish.totalAmount || dish.totalAmount;
      return amount;
    }, 0);
    console.log(this.totalAmount);
    this.taxAmount = Math.floor(0.15 * this.totalAmount);
    this.finalAmount = this.totalAmount + this.taxAmount;
  }

  addToCart(dish) {
    let sameObj = [];
    if (!this.cartArray.length) {
      dish.itemsAdded = 1;
      this.cartArray.push(dish);
    }
    else {
      sameObj = this.cartArray.filter(dishes => {
        return dishes.fId === dish.fId;
      });
      if (sameObj.length) {
        sameObj[0].itemsAdded += 1;
        this.cartArray = this.cartArray.filter(dishes => {
          return dishes.fId !== dish.fId;
        });
        this.cartArray.push(sameObj[0]);
      } else {
        dish.itemsAdded = 1;
        this.cartArray.push(dish);
      }
    }
    this.dataService.cartArray = this.cartArray;
    this.setCartArray();
    console.log(this.cartArray);
  }

  removeFromCart(dish) {
    let sameObj = [];
    if (this.cartArray.length) {
      sameObj = this.cartArray.filter(dishes => {
        return dishes.fId === dish.fId;
      });
      if (sameObj.length) {
        if (sameObj[0].itemsAdded > 1) {
          sameObj[0].itemsAdded -= 1;
          this.cartArray = this.cartArray.filter(dishes => {
            return dishes.fId !== dish.fId;
          });
          this.cartArray.push(sameObj[0]);
        } else if (sameObj[0].itemsAdded === 1) {
          this.cartArray = this.cartArray.filter(dishes => {
            return dishes.fId !== dish.fId;
          });
        }
      }
      this.dataService.cartArray = this.cartArray;
      this.setCartArray();
      console.log(this.cartArray);
    }
  }

  getOrderIds() {
    const orderIds = [];
    if (this.orders.length) {
      for (const order of this.orders) {
        orderIds.push(order.orderId);
      }
      return orderIds;
    }
  }

  placeOrder() {
    const totalItems = this.cartArray.reduce((amount, dish) => {
      amount = amount + dish.itemsAdded || dish.itemsAdded;
      return amount;
    }, 0);
    let maxId = Math.max.apply(null, this.getOrderIds());
    maxId = +(maxId + 1);
    const orderObj = {
      orderId: String(maxId) ,
      vendorId: this.cartArray[0].vendorId,
      price: this.finalAmount,
      quantity: totalItems,
      discount: 'NA',
      estimatedTime: '40mins'
    };
    this.dataService.placeOrder(orderObj);
    this.alertCtrl.create({
      header: 'Done !',
      message: 'Your Order has been placed successfully',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/success']);
        }
      }]
    }).then(alertEl => {
    alertEl.present();
    });
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

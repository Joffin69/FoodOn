import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  order: any;
  orderSub: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.order = this.dataService.placedOrder;
    this.dataService.cartArray = [];
    // this.orderSub = this.dataService.getPlacedOrdersUpdateListener()
    // .subscribe((order: {orders: any}) => {
    //   this.order = order.orders[0];
    // });
  }

}

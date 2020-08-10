import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators'
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-vendor-menu',
  templateUrl: './vendor-menu.page.html',
  styleUrls: ['./vendor-menu.page.scss'],
})
export class VendorMenuPage implements OnInit {
  menu$: Observable<any>;
  vendor$: Observable<any>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(param => {
      if (!param.id) {
        return this.router.navigate(["tabs"]);
      }
      this.loadVendorMenu(param.id);
    })

  }

  async loadVendorMenu(venordId) {
    this.vendor$ = this.dataService.getVendor(venordId);
    this.menu$ = this.dataService.getDishesForVendor(venordId);
  }

  orderDish(dish) {

    this.router.navigate(["order-dish"], {
      queryParams: {
        id: dish.id
      }
    })

  }

}

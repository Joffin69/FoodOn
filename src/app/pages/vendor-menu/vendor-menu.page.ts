import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-vendor-menu',
  templateUrl: './vendor-menu.page.html',
  styleUrls: ['./vendor-menu.page.scss'],
})
export class VendorMenuPage implements OnInit {
  menu$: Observable<any>;
  vendorId: string;
  vendorSub: Subscription;
  vendor: any;
  category: any;
  dishes: any;
  loadedDishes: any;
  selectedCategory: any;
  categorySub: Subscription;
  dishSub: Subscription;
  toggleValue = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    // this.activatedRoute.queryParams.subscribe(param => {
    //   if (!param.id) {
    //     return this.router.navigate(["tabs"]);
    //   }
    //   this.loadVendorMenu(param.id);
    // })
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('vendorId')) {
        // redirect
        return;
      }
      this.vendorId = paramMap.get('vendorId');
    });
    this.loadVendorMenu(this.vendorId);
  }

  loadVendorMenu(venordId) {
    // this.vendor$ = this.dataService.getVendor(venordId);
    // this.menu$ = this.dataService.getDishesForVendor(venordId);
    this.dataService.getVendor(venordId);
    this.dataService.getCategoriesForVendor(venordId);
    this.dataService.getAllDishes(venordId);
    this.vendorSub = this.dataService.getVendorDataUpdateListener()
    .subscribe((vendorData: {vendor: any}) => {
      this.vendor = vendorData.vendor[0];
      this.getRatingClass();
    });
    this.dataService.getCategoriesUpdateListener()
    .subscribe((categories: {category: any}) => {
      this.category = categories.category;
    });
    this.dataService.getDishesUpdateListener()
    .subscribe((dishesList: {dishes: any}) => {
      this.dishes = dishesList.dishes;
      this.loadedDishes = [...this.dishes];
    });
  }

  loadDishesByCategory(category) {
    this.selectedCategory = category;

  }

  filterDishType(event) {
    if (event === true) {
      this.loadedDishes = [...this.dishes.filter((dish) => {
        return dish.type === 'Veg';
      })];
    } else {
      this.loadedDishes = [...this.dishes.filter((dish) => {
        return dish.type !== 'All';
      })];
    }
  }

  getRatingClass() {
    const numArray = [1, 2, 3, 4, 5];
    const ratingsClass = [];
    if (this.vendor.ratings) {
      for (const num of numArray) {
        const flagObj = {fa_star: false, checked: false, fa_star_half: false};
        if (this.vendor.ratings >= num) {
          flagObj.fa_star = true;
          flagObj.checked = true;
          flagObj.fa_star_half = false;
        } else if (this.vendor.ratings < num) {
          if (this.vendor.ratings >= +(num - 0.5)) {
            flagObj.fa_star = false;
            flagObj.checked = true;
            flagObj.fa_star_half = true;
          } else {
            flagObj.fa_star = true;
            flagObj.checked = false;
            flagObj.fa_star_half = false;
          }
        }
        ratingsClass.push(flagObj);
      }
    }
    this.vendor.ratingsClass = ratingsClass;
  }



  orderDish(dish) {

    // this.router.navigate(["order-dish"], {
    //   queryParams: {
    //     id: dish.id
    //   }
    // })

  }

}

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
  dishesAdded = [];
  orderedDishes = [];

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
        return this.router.navigate(['tabs']);
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
    this.loadedDishes = [...this.dishes.filter((dish) => {
      return dish.categoryId === this.selectedCategory.categoryId;
    })];
  }

  filterDishType(event) {
    if (event === true) {
      if (this.selectedCategory) {
        this.loadedDishes = [...this.dishes.filter((dish) => {
          return dish.categoryId === this.selectedCategory.categoryId;
        })];
        this.loadedDishes = [...this.loadedDishes.filter((dish) => {
          return dish.type === 'Veg';
        })];
        return;
      }
      this.loadedDishes = [...this.dishes.filter((dish) => {
        return dish.type === 'Veg';
      })];
    } else {
      this.loadedDishes = [...this.dishes.filter((dish) => {
        return dish.type !== 'All';
      })];
      if (this.selectedCategory) {
        this.loadedDishes = [...this.dishes.filter((dish) => {
          return dish.categoryId === this.selectedCategory.categoryId;
        })];
      }
    }
  }

  isRequired() {
    if (this.vendor) {
      if (this.vendor.name === 'Shri Sai' || this.vendor.name === 'Palkhi') {
        return true;
      }
      return false;
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

  addToCart(dish) {
    let sameObj = [];
    if (!this.dishesAdded.length) {
      dish.itemsAdded = 1;
      this.dishesAdded.push(dish);
    }
    else {
      sameObj = this.dishesAdded.filter(dishes => {
        return dishes.fId === dish.fId;
      });
      if (sameObj.length) {
        sameObj[0].itemsAdded += 1;
        this.dishesAdded = this.dishesAdded.filter(dishes => {
          return dishes.fId !== dish.fId;
        });
        this.dishesAdded.push(sameObj[0]);
      } else {
        dish.itemsAdded = 1;
        this.dishesAdded.push(dish);
      }
    }
    this.dataService.cartArray = this.dishesAdded;
    console.log(this.dishesAdded);
    this.orderedDishes.push(dish);
  }

  removeFromCart(dish) {
    let sameObj = [];
    if (this.dishesAdded.length) {
      sameObj = this.dishesAdded.filter(dishes => {
        return dishes.fId === dish.fId;
      });
      if (sameObj.length) {
        if (sameObj[0].itemsAdded > 1) {
          sameObj[0].itemsAdded -= 1;
          this.dishesAdded = this.dishesAdded.filter(dishes => {
            return dishes.fId !== dish.fId;
          });
          this.dishesAdded.push(sameObj[0]);
        } else if (sameObj[0].itemsAdded === 1) {
          this.dishesAdded = this.dishesAdded.filter(dishes => {
            return dishes.fId !== dish.fId;
          });
        }
      }
      this.dataService.cartArray = this.dishesAdded;
      console.log(this.dishesAdded);
    }
    this.orderedDishes = this.orderedDishes.filter(dishes => {
      return dishes.fId !== dish.fId;
    });
  }

  goToCart() {
    this.router.navigate(['/order-dish']);
  }

}

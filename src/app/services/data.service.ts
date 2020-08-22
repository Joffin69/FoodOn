import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  newDishes: object[];
  recDishes: object[];
  vendors: object[];
  vendorData: object;
  categories: object[];
  dishes: object[];
  cartArray = [];
  newDishesUpdated = new Subject<{dishes: object[]}>();
  recDishesUpdated = new Subject<{dishes: object[]}>();
  vendorsUpdated = new Subject<{vendors: object[]}>();
  vendorDataUpdated = new Subject<{vendor: any}>();
  categoriesUpdated = new Subject<{category: any}>();
  dishesUpdated = new Subject<{dishes: any}>();

  constructor(private http: HttpClient, private router: Router) { }

  getnewDishesUpdateListener() {
    return this.newDishesUpdated.asObservable();
  }

  getrecDishesUpdateListener() {
    return this.recDishesUpdated.asObservable();
  }

  getVendorsUpdateListener() {
    return this.vendorsUpdated.asObservable();
  }

  getVendorDataUpdateListener() {
    return this.vendorDataUpdated.asObservable();
  }

  getCategoriesUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }

  getDishesUpdateListener() {
    return this.dishesUpdated.asObservable();
  }

  getAllVendors() {
    // return this.af.collection('vendors').valueChanges({ idField: 'id' });
    this.http.get<{message: string, result: any}>('http://localhost:3000/api/data/getAllVendors')
    .subscribe((data) => {
      this.vendors = data.result;
      this.vendorsUpdated.next({vendors: this.vendors});
    }, error => {
      console.log('An error occurred while getting all transactions');
    });
  }

  getNewDishes() {
    // return this.af.0collection('dishes', snap => snap.where('tags', 'array-contains-any', ['new'])).valueChanges({ idField: 'id' });
    this.http.get<{message: string, result: any}>('http://localhost:3000/api/data/getNewDishes')
    .subscribe((data) => {
      this.newDishes = data.result;
      this.newDishesUpdated.next({dishes: this.newDishes});
    }, error => {
      console.log('An error occurred while getting all transactions');
    });
  }

  getCategoriesForVendor(vendoId) {
    // const ref = this.af.collection('vendors').doc(vendorId).ref;
    // return this.af.collection('dishes', snap => snap.where('vendor', '==', ref)).valueChanges({ idField: 'id' });
    const vendor = {
      vendorId: vendoId
    };
    this.http.post<{message: string, result: any}>('http://localhost:3000/api/data/getCategoriesForVendor', vendor)
    .subscribe((data) => {
      this.categories = data.result;
      this.categoriesUpdated.next({category: this.categories});
    }, error => {
      console.log('Could not retrieve Category list.');
    });
  }

  getRecommendedDishes() {
    // return this.af.collection('dishes', snap => snap.where('rating', '>=', 3.5)).valueChanges({ idField: 'id' });
    this.http.get<{message: string, result: any}>('http://localhost:3000/api/data/getRecDishes')
    .subscribe((data) => {
      this.recDishes = data.result;
      this.recDishesUpdated.next({dishes: this.recDishes});
    }, error => {
      console.log('An error occurred while getting all transactions');
    });
  }

  getVendor(vendoId: any) {
    // return this.af.collection('vendors').doc(vendorId).valueChanges();
    const vendor = {
      vendorId: vendoId
    };
    this.http.post<{message: string, result: any}>('http://localhost:3000/api/data/getVendor', vendor)
    .subscribe((data) => {
      this.vendorData = data.result;
      this.vendorDataUpdated.next({vendor: this.vendorData});
    }, error => {
      console.log('Could not retrieve Vendor data.');
    });
  }

  getAllDishes(vendoId) {
    // return this.af.collection('dishes').doc(dish).valueChanges().pipe(
    //   switchMap(x => {
    //     console.log(x);
    //     return of(x);
    //   })
    // );
    const vendor = {
      vendorId: vendoId
    };
    this.http.post<{message: string, result: any}>('http://localhost:3000/api/data/getVendorDishes', vendor)
    .subscribe((data) => {
      this.dishes = data.result;
      this.dishesUpdated.next({dishes: this.dishes});
    }, error => {
      console.log('Could not retrieve Vendor data.');
    });
  }
}

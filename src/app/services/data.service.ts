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
  newDishesUpdated = new Subject<{dishes: object[]}>();
  recDishesUpdated = new Subject<{dishes: object[]}>();

  constructor(private http: HttpClient, private router: Router) { }

  getnewDishesUpdateListener() {
    return this.newDishesUpdated.asObservable();
  }

  getrecDishesUpdateListener() {
    return this.recDishesUpdated.asObservable();
  }

  getAllVendors() {
    // return this.af.collection('vendors').valueChanges({ idField: 'id' });
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

  getDishesForVendor(vendorId) {
    // const ref = this.af.collection('vendors').doc(vendorId).ref;
    // return this.af.collection('dishes', snap => snap.where('vendor', '==', ref)).valueChanges({ idField: 'id' });
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

  getVendor(vendorId) {
    // return this.af.collection('vendors').doc(vendorId).valueChanges();
  }

  getDish(dish) {
    // return this.af.collection('dishes').doc(dish).valueChanges().pipe(
    //   switchMap(x => {
    //     console.log(x);
    //     return of(x);
    //   })
    // );
  }
}

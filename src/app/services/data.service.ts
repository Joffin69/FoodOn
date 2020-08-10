import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore'
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private af: AngularFirestore) { }

  getAllVendors() {
    return this.af.collection('vendors').valueChanges({ idField: 'id' });
  }

  getNewDishes() {
    return this.af.collection('dishes', snap => snap.where('tags', 'array-contains-any', ['new'])).valueChanges({ idField: 'id' });
  }

  getDishesForVendor(vendorId) {
    const ref = this.af.collection('vendors').doc(vendorId).ref;
    return this.af.collection('dishes', snap => snap.where('vendor', '==', ref)).valueChanges({ idField: 'id' });
  }

  getRecommendedDishes() {
    return this.af.collection('dishes', snap => snap.where('rating', '>=', 3.5)).valueChanges({ idField: 'id' });
  }

  getVendor(vendorId) {
    return this.af.collection('vendors').doc(vendorId).valueChanges();
  }

  getDish(dish) {
    return this.af.collection('dishes').doc(dish).valueChanges().pipe(
      switchMap(x => {
        console.log(x);
        return of(x);
      })
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'menu-tab.page.html',
  styleUrls: ['menu-tab.page.scss']
})
export class MenuPage implements OnInit{

  vendorSub: Subscription;
  vendors: any;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    // this.vendors$ = this.dataService.getAllVendors();
    this.dataService.getAllVendors();
    this.vendorSub = this.dataService.vendorsUpdated.
    subscribe((vendorsList: {vendors: []}) => {
      this.vendors = vendorsList.vendors;
      this.getRatingClass();
    });
  }

  goToVendor(vendor) {
    this.dataService.vendorId = vendor.vendorId;
    this.router.navigate(['/vendor-menu']);
  }

  getRatingClass() {
    const numArray = [1, 2, 3, 4, 5];
    let ratingsClass = [];
    for (const vendor of this.vendors) {
      if (vendor.ratings) {
        for (const num of numArray) {
          const flagObj = {fa_star: false, checked: false, fa_star_half: false};
          if (vendor.ratings >= num) {
            flagObj.fa_star = true;
            flagObj.checked = true;
            flagObj.fa_star_half = false;
          } else if (vendor.ratings < num) {
            if (vendor.ratings >= +(num - 0.5)) {
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
      vendor.ratingsClass = ratingsClass;
      ratingsClass = [];
    }
  }

  // loadVendorMenu(vendor) {
  //   this.router.navigate(['vendor-menu'], {
  //     queryParams: {
  //       id: vendor.id
  //     }
  //   })
  // }
}

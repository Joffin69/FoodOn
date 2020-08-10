import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'menu-tab.page.html',
  styleUrls: ['menu-tab.page.scss']
})
export class MenuPage {

  vendors$: Observable<any>;

  constructor(private dataService: DataService, private router: Router) {

  }

  ngOnInit() {
    this.vendors$ = this.dataService.getAllVendors();
  }

  loadVendorMenu(vendor) {
    this.router.navigate(['vendor-menu'], {
      queryParams: {
        id: vendor.id
      }
    })
  }
}

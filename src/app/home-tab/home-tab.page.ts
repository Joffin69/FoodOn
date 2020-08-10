import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home-tab.page.html',
  styleUrls: ['home-tab.page.scss']
})
export class HomePage {
  newDishes$: Observable<any>;
  recommended$: Observable<any>;
  slideOpts = {
    // slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.newDishes$ = this.dataService.getNewDishes();
    this.recommended$ = this.dataService.getRecommendedDishes();
  }

}

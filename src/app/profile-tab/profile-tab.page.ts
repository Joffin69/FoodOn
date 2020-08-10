import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'profile-tab.page.html',
  styleUrls: ['profile-tab.page.scss']
})
export class ProfilePage {

  user$: Observable<any>
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user$ = this.authService.getUserInfo();
    this.user$.subscribe(x => console.log(x));

  }
  logout() {
    this.authService.logout();
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'profile-tab.page.html',
  styleUrls: ['profile-tab.page.scss']
})
export class ProfilePage implements OnInit{

  userSub: Subscription;
  userInfo: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.user$ = this.authService.getUserInfo();
    // this.user$.subscribe(x => console.log(x));
    this.authService.getUserInfo();
    this.userSub = this.authService.getUserInfoSub()
    .subscribe((userInfo: {user: any}) => {
      this.userInfo = userInfo.user[0];
    });
  }
  logout() {
    this.authService.logout();
  }

}

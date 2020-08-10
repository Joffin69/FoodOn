import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.page.html',
  styleUrls: ['./setup-profile.page.scss'],
})
export class SetupProfilePage implements OnInit {
  @ViewChild("slider") slider: IonSlides
  name: string;
  phone: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  next() {
    this.slider.slideNext();
  }

  saveUser() {
    if (!this.name) {
      return;
    }
    this.authService.saveUserInfo({ name: this.name, phone: this.phone })

  }

}

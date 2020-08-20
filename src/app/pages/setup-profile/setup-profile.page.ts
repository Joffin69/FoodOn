import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.page.html',
  styleUrls: ['./setup-profile.page.scss'],
})
export class SetupProfilePage implements OnInit {
  @ViewChild('slider') slider: IonSlides;
  name: string;
  phone: string;
  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  next() {
    this.slider.slideNext();
  }

  saveUser(form: NgForm) {
    this.authService.saveUserInfo({ name: form.value.name, emailId: form.value.emailId, phone: form.value.phone });
  }

}

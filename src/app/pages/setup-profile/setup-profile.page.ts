import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
  emailPattern = '/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/';
  public formOne: FormGroup;

  constructor(private authService: AuthService, public formBuilder: FormBuilder) {
      // this.formOne = formBuilder.group({
      //   name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      //   emailId: ['', Validators.compose([Validators.pattern('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'), Validators.required])],
      //   phone: ['', Validators.compose([Validators.pattern(this.mobNumberPattern), Validators.required])]
      // });
   }

  ngOnInit() {
    this.formOne = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      emailId: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      phone: new FormControl(null, {
        validators: [Validators.pattern(this.mobNumberPattern), Validators.required] }),
    });
  }

  next() {
    this.slider.slideNext();
  }

  saveUser() {
    if (this.formOne.invalid) {
      return;
    }
    this.authService.saveUserInfo({ name: this.formOne.value.name,
       emailId: this.formOne.value.emailId, phone: this.formOne.value.phone });
    this.formOne.reset();
  }

}

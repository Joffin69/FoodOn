import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  pValid = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // TODO Navigate user to dashboard if already loggedin
  }

  confirmPwd(form: NgForm) {
    if (form.value.password === form.value.confirm_password) {
        this.pValid = false;
    } else {
      this.pValid = true;
    }
  }

  registerUser(form: NgForm) {
    // TODO more password requirements needs to be added
    // this.authService.signup(this.email, this.password);
    if (form.invalid) {
      return;
    }
    this.authService.signup(form.value.empId, form.value.password);
  }

}

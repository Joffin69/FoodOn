import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  empId: string;
  password: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // TODO Navigate user to dashboard if already loggedin
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.empId, form.value.password);
    form.resetForm();
  }

}

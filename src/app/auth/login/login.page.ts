import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    //TODO Navigate user to dashboard if already loggedin
  }

  login() {
    this.authService.login(this.email, this.password);
  }

}

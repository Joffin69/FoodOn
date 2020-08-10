import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string;
  password: string;
  confirmPass: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    //TODO Navigate user to dashboard if already loggedin
  }



  signup() {

    if (!this.email || !this.password || !this.confirmPass) {
      return;
    }
    if (this.password !== this.confirmPass) {
      return;
    }
    //TODO more password requirements needs to be added

    this.authService.signup(this.email, this.password);

  }

}

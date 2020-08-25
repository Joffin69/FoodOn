import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { Observable, of } from 'rxjs';
// import { Router } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { take, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user: Observable<firebase.User>;
  private isUserAuthnticated = false;
  private tokenTimer: any;
  private token: string;
  private empId: string;
  userInfo: any;
  private userAuthStatusSub = new Subject<boolean>();
  private userInfoSub = new Subject<{user: any}>();

  constructor(private http: HttpClient, private router: Router, private alertCtrl: AlertController) {
    // this.user = firebaseAuth.authState;
  }

  getToken() {
    return this.token;
  }

  getEmpId() {
    return this.empId;
  }

  getUserAuthd() {
    return this.isUserAuthnticated;
  }

  getAuthSub() {
    return this.userAuthStatusSub.asObservable();
  }

  getUserInfoSub() {
    return this.userInfoSub.asObservable();
  }

  // signup(email: string, password: string) {
  //   this.firebaseAuth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(value => {
  //       this.router.navigate(['/setup-profile']);
  //     })
  //     .catch(err => {
  //       console.log('Something went wrong:', err.message);
  //     });
  // }

  // login(email: string, password: string) {
  //   this.firebaseAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .then(value => {
  //       const uid = value.user.uid;
  //       this.af.collection('users').doc(uid).get().subscribe(data => {
  //         const userData = data.data();
  //         if (!userData) {// new user
  //           this.router.navigate(['/setup-profile']);
  //         } else {
  //           this.router.navigate(['/tabs']);
  //         }
  //       });
  //     })
  //     .catch(err => {
  //       console.log('Something went wrong:', err.message);
  //     });
  // }

  signup(empId1: string, pwd: string) {
    const form = {
      empId: empId1,
      password: pwd
    };
    this.http.post<{message: string, result: object}>('http://localhost:3000/api/user/signup', form)
    .subscribe((result) => {
      // console.log(result);
      this.alertCtrl.create({
        header: 'Done !',
        message: 'Your sign in was successfull. Please login to continue.',
        buttons: [{
          text: 'OK',
          handler: () => {
           this.router.navigate(['/login']);
          }
        }]
      }).then(alertEl => {
      alertEl.present();
      });
    }, error => {
      console.log(error);
    });
  }

  login(empId1: string, password: string) {
    const user = {
      empId: empId1,
      pwd: password
    };
    this.http.post<{message: string, token: string, expiresIn: number, user: any}>('http://localhost:3000/api/user/login', user)
    .subscribe(result => {
      if (result && result.token) {
        this.token = result.token;
        const expireDuration = result.expiresIn;
        this.empId = result.user.empId;
        this.isUserAuthnticated = true;
        this.userAuthStatusSub.next(true);
        this.empId = result.user.empId;
        const expirationDate = new Date(
          new Date().getTime() + expireDuration * 1000
        );
        this.saveAuthData(result.user.empId, this.token, expirationDate);
        if (result.user.name === 'xyz') {
          this.router.navigate(['/setup-profile']);
        } else {
          this.router.navigate(['./tabs']);
        }
      }
    }, error => {
      console.log(error);
      this.userAuthStatusSub.next(false);
      this.isUserAuthnticated = false;
    });
 }

  saveUserInfo(userInfo: any) {
    // this.user.pipe(take(1)).subscribe(user => {
    //   this.af.collection('users').doc(user.uid).set(userInfo).then(() => {
    //     this.router.navigate(['/tabs']);
    //   });
    // });
    userInfo.empId = this.getEmpId();
    this.http.post<{message: string, result: object}>('http://localhost:3000/api/user/saveUser', userInfo)
    .subscribe((result) => {
      this.alertCtrl.create({
        header: 'Done !',
        message: 'Profile setup completed !',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/tabs']);
          }
        }]
      }).then(alertEl => {
         alertEl.present();
      });
    }, error => {
      console.log(error);
    });
  }

  saveAuthData(empId: string, token: string, expiresIn: Date) {
    localStorage.setItem('empId', empId);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expiresIn.toISOString());
  }

  getAuthData() {
    const empIds = localStorage.getItem('empId');
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    return {
      empId: empIds,
      tokenId: token,
      expiresDate: new Date(expirationDate)
    };
  }

  clearAuthData() {
    localStorage.removeItem('empId');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }

  getUserInfo() {
    // return this.user.pipe(switchMap(x => {
    //   if (x) {
    //     return this.af.collection('users').doc(x.uid).valueChanges();
    //   }
    //   return of(null);
    // }));
    const userInfo = {
      empId: this.getAuthData().empId
    };
    this.http.post<{message: string, result: any}>('http://localhost:3000/api/user/getUserInfo', userInfo)
    .subscribe((data) => {
      this.userInfo = data.result;
      this.userInfoSub.next({user: this.userInfo});
    }, error => {
      console.log('An error occurred while getting all transactions');
    });
  }

  loginWithGooogle(phone) {
    // this.firebaseAuth.signInWithPhoneNumber(phone,)
  }

  logout() {
    // this.firebaseAuth.signOut().then(() => {
    //   this.router.navigate(['/login']);
    // });
    this.isUserAuthnticated = false;
    this.userAuthStatusSub.next(false);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }
}




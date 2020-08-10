import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private af: AngularFirestore) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(['/setup-profile'])
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        const uid = value.user.uid;
        this.af.collection("users").doc(uid).get().subscribe(data => {
          const userData = data.data();
          if (!userData) {//new user
            this.router.navigate(['/setup-profile'])
          } else {
            this.router.navigate(['/tabs']);
          }
        });
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  saveUserInfo(userInfo) {
    this.user.pipe(take(1)).subscribe(user => {
      this.af.collection("users").doc(user.uid).set(userInfo).then(() => {
        this.router.navigate(['/tabs']);
      });
    })
  }
  getUserInfo() {
    return this.user.pipe(switchMap(x => {
      if (x) {
        return this.af.collection('users').doc(x.uid).valueChanges();
      }
      return of(null);

    }))
  }

  loginWithGooogle(phone) {
    // this.firebaseAuth.signInWithPhoneNumber(phone,)
  }

  logout() {
    this.firebaseAuth.signOut().then(() => {
      this.router.navigate(["/login"])
    });
  }
}




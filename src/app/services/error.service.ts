import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })

export class ErrorService {
  private errorListener = new Subject<string>();
  private alertCtrl: AlertController;

  getErrorListener() {
    return this.errorListener.asObservable();
  }

  throwError(messages: string) {
    this.alertCtrl.create({
        header: 'Oops....',
        message: messages,
        buttons: ['OK']
    }).then(alertEl => {
    alertEl.present();
    });
  }

  handleError() {
    this.errorListener.next(null);
  }
}

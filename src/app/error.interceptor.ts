import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse
  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { ErrorService } from './services/error.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

constructor(private errorService: ErrorService, private alertCtrl: AlertController) {}

intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
    catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error.message) {
        errorMessage = error.error.message;
        }
        // this.errorService.throwError(errorMessage);
        this.alertCtrl.create({
            header: 'Oops....',
            message: errorMessage,
            buttons: ['OK']
        }).then(alertEl => {
        alertEl.present();
        });
        return throwError(error);
    })
    );
}
}

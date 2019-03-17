import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private matSnackbar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error.message ? err.error.message : 'An unknown error occurred!';
        this.matSnackbar.open(errorMessage, 'OK', { duration: 3000 });
        window.alert(errorMessage);
        return throwError(err);
      })
    );
  }
}

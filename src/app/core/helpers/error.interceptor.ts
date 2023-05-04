import { AuthenticationService } from '../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, retry, tap, throwError } from 'rxjs';

@Injectable()
export class errorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      tap((evt) => {
        let evtMessage: any;
        if (evt instanceof HttpResponse) {
          if (evt.status === 202) {
            evtMessage = evt.statusText;
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage: any;
          if (error.status === 401) {

            errorMessage = 'Credenciales incorrectas';
            this.authService.logout();
            return throwError(() => errorMessage);
          }
          else{
            return throwError(() => error.message);
          }

      })
    );
  }
}

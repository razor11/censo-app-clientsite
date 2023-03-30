import { AuthenticationService } from '../services/authentication/authentication.service';
import { Injectable, NgModule } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, from, tap, throwError } from 'rxjs';

@Injectable()
export class errorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((evt) => {
        let evtMessage: any;
        if (evt instanceof HttpResponse) {
          if (evt.status === 202) {
            evtMessage = evt.statusText;
          }
        }
      }),
      catchError((error) => {
        let errorMessage: any;
        if (error instanceof HttpErrorResponse) {
          console.error('error status = ', error.status);
          errorMessage = error.status;
          if (error.status === 401) {
            errorMessage = 'Unauthorized';
            this.authService.logout();
          }
        }
        return throwError(() => errorMessage);
      })
    );
  }
}

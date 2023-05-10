import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor( private storageService: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.storageService.getUser();
    const isLoggedIn = this.storageService.isLoggedIn();
    const isApiUrl = request.url.startsWith(environment.APIURL);
    const apiAuth = request.url.startsWith(
      `${environment.APIURL}/api/V1/authenticate`
    );

    if (!isLoggedIn && apiAuth) {
      request = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'HTTP-X-API-KEY': `${environment.APIKEY}`,
        }),
      });
    }

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.access_token}`,
        },
      });
    }

    return next.handle(request);
  }
}

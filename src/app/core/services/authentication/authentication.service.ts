import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';
import { tokenGetter } from 'src/app/app.module';
import { StorageService } from '../storage.service';

const AUTH_API = 'api/V1/authenticate';

const jwt = new JwtHelperService();
const tokenStatus = tokenGetter();

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public tokenAccess = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {
    if (this.storageService.isLoggedIn()) {
      this.validateToken();
    }
  }

  validateToken() {
    if (jwt.isTokenExpired(tokenStatus as string)) {
      this.logout();
    }
  }

  login(userName: string, pwd: string): Observable<any> {
    const credentials = {
      username: userName,
      password: pwd,
    };

    let headers = new HttpHeaders();

    return this.http
      .post<User>(`${environment.APIURL}/${AUTH_API}`, credentials, {
        headers: headers,
      })
      .pipe(
        map((user: any) => {
          const decode = jwt.decodeToken(user.access_token);
          this.storageService.saveUser(decode);

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    this.storageService.cleanSession();
    this.router.navigate(['/login']);
  }
}

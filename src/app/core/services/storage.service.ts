import { Injectable } from '@angular/core';


const USER_KEY = 'auth-user';
const DECODE_USER = 'user-info';




@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  cleanSession(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(DECODE_USER);

    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.setItem(DECODE_USER, user.username);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }


  public getUserInfo(): any {
    const userInfo = window.sessionStorage.getItem(DECODE_USER);
    if (userInfo) {
      return userInfo;
    }

    return {};

  }
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return true;
    }

    return false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';
import {AuthToken} from  '../interfaces/iauth-token';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  private loginURL = environment.baseURL + 'api/token/';
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string | null>(localStorage.getItem('username'));


  login(username: string, password: string) {
    
    return this.http.post<any>(this.loginURL, { username, password }).pipe(
      map(result => {
        if (result && result.access) {
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('jwt', result.access);
          const decoded = jwt_decode<AuthToken>(result.access);
          localStorage.setItem('username', decoded.user_id);
          this.UserName.next(localStorage.getItem('username'));
        }
      })
    );
  }
  logout() {
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    this.loginStatus.next(false);
  }

  checkLoginStatus(): boolean {

    const loginCookie = localStorage.getItem('loginStatus');

    if (loginCookie === '1') {
      if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) {
        return false;
      }

      // Get and Decode the Token
      const token:string = localStorage.getItem('jwt') as string;
      // let jwt_decode1 = require('jwt-decode');
      const decoded = jwt_decode<AuthToken>(token);
      console.log(decoded);
      // Check if the cookie is valid

      if (decoded.exp === undefined) {
        return false;
      }

      // Get Current Date Time
      const date = new Date(0);

      // Convert EXp Time to UTC
      const tokenExpDate = date.setUTCSeconds(decoded.exp);

      // If Value of Token time greter than

      if (tokenExpDate.valueOf() > new Date().valueOf()) {
        return true;
      }
      return false;

    }
    return false;
  }

  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

}

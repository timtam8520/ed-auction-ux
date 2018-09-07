import { BASE_URL } from '../base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenName } from './authentication.base';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticationURL = BASE_URL + '/users/authenticate';

  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem(tokenName)) {
      // user is logged in
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }

  login(username: string, password: string) {
    return this.http.post<any>(this.authenticationURL, { username, password })
      .pipe(map(user => {
        // login is successful
        if (user && user.token) {
          // store user token in localStorage to persist between refreshes
          localStorage.setItem(tokenName, JSON.stringify(user));
          this.isLoggedIn = true;
        }
        return user;
      }));
  }

  logout() {
    // remove user token from local storage, logging user out
    localStorage.removeItem(tokenName);
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
  }
}

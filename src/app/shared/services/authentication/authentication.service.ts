import { BASE_URL } from '../base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenName } from './authentication.base';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticationURL = BASE_URL + '/users/authenticate';

  isLoggedIn = false;
  name = '';

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
      .pipe(map(data => {
        // login is successful
        if (data && data.token) {
          const token = data.token;
          // store user token in localStorage to persist between refreshes
          localStorage.setItem(tokenName, token);
          this.isLoggedIn = true;
        }
        return data;
      }));
  }

  logout() {
    // remove user token from local storage, logging user out
    localStorage.removeItem(tokenName);
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
    this.name = '';
  }

  getUserName() {
    if (this.name === '') {
      const token = localStorage.getItem(tokenName);
      const userData = jwt.decode(token);
      if (userData != null) {
        this.name = `${userData['firstName']} ${userData['lastName']}`;
      }
    }
    return this.name;
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { tokenName } from './authentication.base';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedInUser = JSON.parse(localStorage.getItem(tokenName));
    // Attach token before sending request
    if (loggedInUser && loggedInUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedInUser.token}`
        }
      });
    }
    // handle any authentication/authorization errors
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 403) {
        this.authService.logout();
      }
      const error = err.error || err.statusText;
      return throwError(error);
    }));
  }
}

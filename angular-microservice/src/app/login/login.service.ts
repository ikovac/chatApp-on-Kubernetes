import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../shared/interfaces/iuser';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = environment.serverUrl;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private jwtHelper: JwtHelperService,
  ) { }

  login(user: IUser) {
    return this.http.post(`${this.url}/user/login`, user, { withCredentials: true });
  }

  logout() {
    if (this.cookieService.check('token')) {
      this.cookieService.delete('token');
    }
  }

  isAuthenticated(): boolean {
    if (!this.cookieService.check('token')) {
      return false;
    }

    const token = this.cookieService.get('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getLoggedInUser(): IUser {
    const token = this.cookieService.get('token');

    const user = this.jwtHelper.decodeToken(token);
    return user ? user : null;
  }
}

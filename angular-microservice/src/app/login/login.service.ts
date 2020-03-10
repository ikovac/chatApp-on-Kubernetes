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
    console.log(`Login attempt at url: ${this.url}/api/user/login`);
    return this.http.post(`${this.url}/api/user/login`, user, { withCredentials: true });
  }

  logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  getLoggedInUser(): IUser {
    const token = localStorage.getItem('token');

    const user = this.jwtHelper.decodeToken(token);
    return user ? user : null;
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../shared/interfaces/iuser';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = environment.serverUrl;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    ) {}

  login(user: IUser) {
    return this.http.post(`${this.url}/user/login`, user, {withCredentials: true});
  }

  logout() {
    if(this.cookieService.check('token')) {
      this.cookieService.delete('token');
    }
  }
}

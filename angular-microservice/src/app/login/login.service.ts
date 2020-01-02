import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = environment.serverUrl;

  constructor(private http: HttpClient) {}

  login(user: IUser) {
    return this.http.post(`${this.url}/user/login`, user, {responseType: 'text'});
  }
}

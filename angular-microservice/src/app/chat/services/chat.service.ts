import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Observable } from 'rxjs';
import { IConversationListElement } from 'src/app/shared/interfaces/iconversationlistelement';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url: string = environment.serverUrl;

  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    ) { }

  getAllUserConversations(): Observable<IConversationListElement[]> {
    const user = this.loginService.getLoggedInUser();

    return this.http.get<IConversationListElement[]>(`${this.url}/api/chat/getalluserconversations/${user.id}`, { withCredentials: true });
  }
}

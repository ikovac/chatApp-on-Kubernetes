import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { AngularMaterialModule } from './angular-material.module';
import { ChatModule } from './chat/chat.module';
import { CookieService } from 'ngx-cookie-service';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

export function jwtOptionsFactory(cookieService) {
  return {
    tokenGetter: () => {
      return cookieService.get('token');
    }
  }
};

export const socketConfig: SocketIoConfig = {
  url: environment.serverUrl,
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    LoginModule,
    ChatModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [CookieService]
      }
    }),
    SocketIoModule.forRoot(socketConfig),
  ],
  providers: [CookieService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

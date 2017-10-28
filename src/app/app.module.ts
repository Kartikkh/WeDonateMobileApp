import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {UsersPage} from '../pages/users/users';
import {NgoPage} from '../pages/ngo/ngo';
import {userSignupPage} from '../pages/users/userSignup/userSignup';
import {ngoSignupPage} from '../pages/ngo/ngoSignup/ngoSignup';
import {authService} from "../services/authService";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UsersPage,
    NgoPage,
    userSignupPage,
    ngoSignupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UsersPage,
    NgoPage,
    ngoSignupPage,
    userSignupPage
  ],
  providers: [
    StatusBar,

    SplashScreen,
    authService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

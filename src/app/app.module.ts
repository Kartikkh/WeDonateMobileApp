import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {UsersPage} from '../pages/users/users';
import {NgoPage} from '../pages/ngo/ngo';
import {userSignupPage} from '../pages/users/userSignup/userSignup';
import {ngoSignupPage} from '../pages/ngo/ngoSignup/ngoSignup';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpClientModule } from '@angular/common/http';
import {ngoAuthService} from '../services/ngoAuthService';
import {AuthInterceptor} from '../services/requestHeader.service';
import {userAuthService} from "../services/userAuthService";
import {ngoDashboard} from "../pages/ngo/dashboard/ngoDashboard";
import {userDashboard} from '../pages/users/dashboard/userDashboard'
import {ResendMail} from '../pages/ngo/resendMail/resendMail'
import {userResendMail} from '../pages/users/resendMail/userResendMail'
import {userPopover} from "../pages/users/sidePopover/sidePopover";
import {ngoPopover} from "../pages/ngo/ngoPopover/ngoPopover";
import {postEvents} from "../pages/ngo/ngoPostEvents/postEvents";
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import {eventDetail} from "../pages/ngo/eventDetailPage/eventDetail";
import { SocialSharing } from '@ionic-native/social-sharing';
import {NgoProfile} from "../pages/ngo/ngoProfile/ngoProfile";
import {nearestEvents} from '../pages/users/nearestEvents/nearestEvents';
import {trendingEvents} from '../pages/users/trendingEvents/trendingEvents';
import {followingEvents} from '../pages/users/followingNgo/followingNgo';


@NgModule({

  declarations: [
    MyApp,
    HomePage,
    UsersPage,
    NgoPage,
    userSignupPage,
    ngoSignupPage,
    ngoDashboard,
    userDashboard,
    ResendMail,
    userResendMail,
    userPopover,
    ngoPopover,
    postEvents,
    eventDetail,
    NgoProfile,
    trendingEvents,
    nearestEvents,
    followingEvents
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UsersPage,
    NgoPage,
    ngoSignupPage,
    userSignupPage,
    ngoDashboard,
    userDashboard,
    ResendMail,
    userResendMail,
    userPopover,
    ngoPopover,
    postEvents,
    NgoProfile,
    eventDetail,
    trendingEvents,
    nearestEvents,
    followingEvents
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ngoAuthService,
    userAuthService,
    Geolocation,
    NativeGeocoder,
    File,
    Camera,
    SocialSharing,
    FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true}
  ]

})
export class AppModule {}

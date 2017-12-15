import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import {Observable} from "rxjs/Observable";
import {NavController} from "ionic-angular";
import {ngoDashboard} from "../pages/ngo/dashboard/ngoDashboard";
import { ViewChild } from '@angular/core';
@Injectable()


export class AuthInterceptor implements HttpInterceptor {
  authHeader :string ;

  constructor( public storage: Storage) {}
  @ViewChild('myNav') nav: NavController;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.storage.get('token').then((val) => {
    this.authHeader=val;
    });

    console.log(this.authHeader);
    // if(this.authHeader===null || this.authHeader===undefined){
    //   this.nav.setRoot(ngoDashboard);
    // }
    const authReq = req.clone({ setHeaders: { authorization: 'Bearer ' + this.authHeader} });

    return next.handle(authReq);

  }

}



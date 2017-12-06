import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import {Observable} from "rxjs/Observable";

@Injectable()


export class AuthInterceptor implements HttpInterceptor {
  authHeader :string ;

  constructor( public storage: Storage) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.storage.get('token').then((val) => {
    this.authHeader=val;
    });

    console.log(this.authHeader);
    const authReq = req.clone({ setHeaders: { authorization: 'Bearer ' + this.authHeader} });

    return next.handle(authReq);

  }

}



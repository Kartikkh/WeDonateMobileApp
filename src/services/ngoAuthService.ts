import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Constants} from '../constant/constant';
import { Storage } from '@ionic/storage';
import { LoadingController,AlertController } from 'ionic-angular';


@Injectable()

export class ngoAuthService {

  public isAuthenticated = false;
  public authToken;

  constructor( public http : HttpClient,
               public alertCtrl: AlertController,
               public loadingCtrl: LoadingController,
               public storage: Storage) {}


  loginNgo(ngo){
    const loading = this.loadingCtrl.create({
      content: 'Logging In',
      spinner : 'dots'
    });

    const alert = this.alertCtrl.create({
      title: 'Sorry for the Inconvenience',
      message: 'Please try again later',
      buttons: ['okay']
    });
    
    loading.present();

    let promise = new Promise((resolve, reject) => {
    this.http.post(Constants.ngoLogin(),ngo).subscribe(
      data=>{
          loading.dismiss();
        if(data === "does not exits" ){
          alert.setMessage("You Have Entered Wrong Registration Id! ");
          alert.present();
          reject()
        } else if(data === "Wrong Password"){
          alert.setMessage("You Have Entered Wrong Password ! ");
          alert.present();
          reject()
        }else{
          this.storeUserCredentials(data);
          resolve()
        }
      },
      error=>{
        loading.dismiss();
        alert.setMessage("Something went wrong ! Please Try Again ");
        alert.present();
        reject();
      })

    });
    return promise;


  }

  storeUserCredentials(Ngo) {
    this.storage.set('token', Ngo.token);
    this.useCredentials(Ngo.token);
  }

  destroyUserCredentials() {
    this.storage.remove('token');
    this.authToken = undefined;
    this.isAuthenticated=false;
  }


  useCredentials(token){
    this.authToken = token;
    this.isAuthenticated=true;
  }


  logout(){
    this.destroyUserCredentials();
  }

}

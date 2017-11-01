import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Constants} from '../constant/constant';
import { Storage } from '@ionic/storage';
import { LoadingController,AlertController } from 'ionic-angular';


@Injectable()

export class ngoAuthService {

  private isAuthenticated = false;
  public authToken;

  constructor( public http : HttpClient,
               public alertCtrl: AlertController,
               public loadingCtrl: LoadingController,
               public storage: Storage) {}


  loginNgo(ngo){
    const loading = this.loadingCtrl.create({
      content: 'Please wait! While we are coming up',
      spinner : 'dots'
    });

    const alert = this.alertCtrl.create({
      title: 'Sorry for the Inconvenience',
      message: 'Please try again later',
      buttons: ['okay']
    });


    loading.present();
    this.http.post(Constants.ngoLogin(),ngo).subscribe(
      data=>{
        loading.dismiss();

        if(data === "does not exits" ){
          alert.setMessage("You Have Entered Wrong Registration Id! ");
          alert.present();
        } else if(data === "Wrong Password"){
          alert.setMessage("You Have Entered Wrong Password ! ");
          alert.present();
        }else{
          this.storeUserCredentials(data);
        }
      },
      error=>{
        loading.dismiss();
        alert.setMessage("Something went wrong ! Please Try Again ");
        alert.present();

      }

    )
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

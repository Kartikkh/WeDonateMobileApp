import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Constants} from '../constant/constant';
import { Storage } from '@ionic/storage';
import { LoadingController,AlertController } from 'ionic-angular';
@Injectable()

export class authService {

  private isAuthenticated = false;
  private authToken;

  constructor( public http : Http,
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
        console.log(data.json());
        if(data.json() === "does not exits" ){
          alert.setMessage("You Have Added Wrong Credentials ! ");
          alert.present();
        }else {
          this.storeUserCredentials(data.json());
        }
      },
      error=>{
        loading.dismiss();
      }

    )
  }

  storeUserCredentials(Ngo) {
    this.storage.set('token', Ngo.token);
    this.storage.set('Credential',Ngo.ngo);
    this.authToken = Ngo.token;
    this.isAuthenticated=true;
  }

  destroyUserCredentials() {
    this.storage.remove('token');
    this.authToken = undefined;
    this.storage.remove('Credential');
    this.isAuthenticated=false;
  }


  logout(){
    this.destroyUserCredentials();
  }

}

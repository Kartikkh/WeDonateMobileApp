import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Constants} from '../constant/constant';
import { Storage } from '@ionic/storage';
import { LoadingController,AlertController } from 'ionic-angular';
@Injectable()

export class authService {

  private isAuthenticated = false;
  public authToken;

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
        alert.setMessage("Something went wrong ! Please Try Again ");
        alert.present();

      }

    )
  }

  storeUserCredentials(Ngo) {
    this.storage.set('token', Ngo.token);
    this.storage.set('Credential',Ngo.ngo);
    this.useCredentials(Ngo.token);

  }

  destroyUserCredentials() {
    this.storage.remove('token');
    this.authToken = undefined;
    this.storage.remove('Credential');
    this.isAuthenticated=false;
  }

  loadCredential(){
    this.authToken = this.storage.get('token');
    if(this.authToken){
      this.isAuthenticated=true;
    }

    return this.authToken;
  }

  useCredentials(token){
    this.authToken = token;
    this.isAuthenticated=true;
  }


  logout(){
    this.destroyUserCredentials();
  }

}

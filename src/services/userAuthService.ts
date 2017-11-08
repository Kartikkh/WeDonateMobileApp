import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Constants} from '../constant/constant';
import { Storage } from '@ionic/storage';
import { LoadingController,AlertController } from 'ionic-angular';



@Injectable()

export class userAuthService{


  public isAuthenticated = false;
  public authToken;



  constructor( public http : HttpClient,
               public alertCtrl: AlertController,
               public loadingCtrl: LoadingController,
               public storage: Storage) {}


  loginUser(user){
    const loading = this.loadingCtrl.create({
      content: 'Logging In !',
      spinner : 'dots'
    });

    const alert = this.alertCtrl.create({
      title: 'Sorry for the Inconvenience',
      message: 'Please try again later',
      buttons: ['okay']
    });


    loading.present();


    let promise = new Promise((resolve, reject) => {
    this.http.post(Constants.userLogin(),user).subscribe(
      data=>{
        loading.dismiss();
        if(data['message']=='Authentication failed. User not found.'){
          alert.setMessage("Please Entered the UserName Correctly ! ");
          alert.present();
          reject()
        } else if(data['message'] === "Your password is invalid!"){
          alert.setMessage("You Have Entered Wrong Password ! ");
          alert.present();
          reject();
        }if(data['message']=== 'First Verify Your Account'){
          alert.setMessage("Please Check your mail and verify your account");
          alert.present();
          reject();
        }else{
          this.storeUserCredentials(data);
          resolve();

        }
      },
      error=>{
        loading.dismiss();
        alert.setMessage("Something went wrong ! Please Try Again ");
        alert.present();
        reject();

      }

    )
    });
    return promise;

  }

  storeUserCredentials(user) {
    this.storage.set('token', user.token);
    this.useCredentials(user.token);

  }



  useCredentials(token){
    this.authToken = token;
    this.isAuthenticated=true;
  }


  destroyUserCredentials()  {
    this.storage.remove('token');
    this.authToken = undefined;
    this.isAuthenticated=false;
  }


  logout() {
     this.destroyUserCredentials();
  }



}

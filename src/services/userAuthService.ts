import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Constants} from '../constant/constant';
import { Storage } from '@ionic/storage';
import { LoadingController,AlertController } from 'ionic-angular';



@Injectable()

export class userAuthService{


  private isAuthenticated = false;
  public authToken;



  constructor( public http : HttpClient,
               public alertCtrl: AlertController,
               public loadingCtrl: LoadingController,
               public storage: Storage) {}


  loginUser(user){
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
    this.http.post(Constants.userLogin(),user).subscribe(
      data=>{
        console.log(data)
        loading.dismiss();

        if(data['message']=='Authentication failed. User not found.'){
          alert.setMessage("Please Entered the UserName Correctly ! ");
          alert.present();
        } else if(data['message'] === "Your password is invalid!"){
          alert.setMessage("You Have Entered Wrong Password ! ");
          alert.present();
        }if(data['message']=== 'First Verify Your Account'){
          alert.setMessage("Please Check your mail and verify your account");
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

  storeUserCredentials(user) {
    this.storage.set('token', user.token);
    this.useCredentials(user.token);

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

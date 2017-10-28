import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Constants} from '../../../constant/constant';

import { LoadingController,AlertController } from 'ionic-angular';


import { Http} from '@angular/http';

@Component({
  selector: 'page-users',
  templateUrl: 'userSignup.html',
})
export class userSignupPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http : Http,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {}




  userSignUp(form : NgForm) {

    const loading = this.loadingCtrl.create({
      content: 'Please wait... while we are coming up',
      spinner : 'dots'
    });

    const alert = this.alertCtrl.create({
      title: 'Sorry for the Inconvenience',
      message: 'Please try again later',
      buttons: ['okay']
    });

    loading.present();
     this.http.post(Constants.userSignUp(),form.value).subscribe(
    data=>{
      loading.dismiss();
      console.log(data.json());
      if(data.json() =="Username Already exits"){
        alert.setMessage("Username Already Exits");
        alert.present();
      }else if(data.json() == "Email Already exits"){
        alert.setMessage( "Email Already exits");
        alert.present();
      }else if (data.json() == "You have Signed-Up successfully, but Verification Email could not be Sent. Try again later."){
        alert.setTitle("Please verify your account after login");
        alert.setMessage("You have Signed-Up successfully, but Verification Email could not be Sent");
        alert.present();
      }

    }, err => {
         loading.dismiss();
          alert.present();
      })


  }



}

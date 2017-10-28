import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Http} from '@angular/http';
import {Constants} from '../../../constant/constant';
import { LoadingController,AlertController } from 'ionic-angular';


@Component({
  selector: 'page-users',
  templateUrl: 'ngoSignup.html',
})
export class ngoSignupPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public http : Http,
              public alertCtrl: AlertController) {}

  ngoSignUp(form : NgForm ){

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
    this.http.post(Constants.ngoSignup(),form.value).subscribe(
      data=>{
        console.log(form.value);
        loading.dismiss();
        console.log(data.json());
        if(data.json().message === "Registration already exits"){
          alert.setMessage("Ngo with Given Registration Id already exits");
          alert.present();
        }
        else if (data.json().message == "You have Signed-Up successfully, but Verification Email could not be Sent. Try again later."){
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

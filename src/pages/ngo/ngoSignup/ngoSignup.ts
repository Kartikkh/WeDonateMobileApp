import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Constants} from '../../../constant/constant';
import { LoadingController,AlertController } from 'ionic-angular';
import {NgoPage} from "../ngo";

@Component({
  selector: 'page-users',
  templateUrl: 'ngoSignup.html',
})
export class ngoSignupPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public http : HttpClient,
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
    this.http.post<any>(Constants.ngoSignup(),form.value).subscribe(
      (data:Response)=>{
        loading.dismiss();
        if(data['message'] === "Registration already exits"){
          alert.setMessage("Ngo with Given Registration Id already exits");
          alert.present();
        }
        else if (data['message'] === "You have Signed-Up successfully, but Verification Email could not be Sent. Try again later."){
          alert.setTitle("Please verify your account after login");
          alert.setMessage("You have Signed-Up successfully, but Verification Email could not be Sent");
          alert.present();
        }else{
          alert.setTitle("Please Verify Your Account After Login");
          alert.setMessage("You have Signed-Up successfully , Please check your mails !");
          alert.present();
          this.navCtrl.setRoot(NgoPage);

        }

      }, err => {
        loading.dismiss();
        alert.present();
      })

  }


}

import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Constants} from "../../../constant/constant";
import { LoadingController,AlertController } from 'ionic-angular';
import {NgoPage} from '../ngo'
@Component({
  templateUrl: 'resendMail.html'
})


export class ResendMail {

  constructor(public navCtrl: NavController,
              public http : HttpClient,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
  ){}


  resendVerificationMail(form : NgForm){

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

    this.http.post(Constants.ngoResendEmail(),form.value).subscribe(
      data=>{
        loading.dismiss();
        if(data['message'] === " You need to Register first !"){
          alert.setTitle("Sorry You are not there with us Before or Email is invalid !");
          alert.setMessage("Please Register First");
          alert.present();
          this.navCtrl.push(NgoPage);
        }
        else if(data['message'] === "Please Try again Later !"){
          alert.present();
        }
        else if(data['message'] === "You have Signed-Up successfully, but Verification Email could not be Sent. Try again later."){
          alert.setTitle("Invalid Email");
          alert.setMessage("Please Provide the correct Email Id !");
          alert.present();
        }else{
          alert.setTitle("We have sent you a Email ");
          alert.setMessage("Please Check your Email");
          alert.present();

        }
    },error=>{
        loading.dismiss();
        alert.setMessage("Something went wrong ! Please Try Again ");
        alert.present();
      })


  }

}

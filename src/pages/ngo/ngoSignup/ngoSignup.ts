import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Http} from '@angular/http';
import {Constants} from '../../../constant/constant';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-users',
  templateUrl: 'ngoSignup.html',
})
export class ngoSignupPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public http : Http) {}

  ngoSignUp(form : NgForm ){
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
   this.http.post(Constants.ngoSignup() , form.value).subscribe(
     data=>{
       loading.dismiss();
          console.log(data);
   }, err => {
       loading.dismiss();
     console.log("Error occured.")
   })
  }


}

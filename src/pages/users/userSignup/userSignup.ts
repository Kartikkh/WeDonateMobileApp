import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Constants} from '../../../constant/constant';
import {Http} from '@angular/http';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-users',
  templateUrl: 'userSignup.html',
})
export class userSignupPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http : Http,
              public loadingCtrl: LoadingController,) {}


  userSignUp(form : NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.http.post(Constants.userSignUp(),form.value).subscribe(
    data=>{
      console.log(data);
      loading.dismiss();
    }, err => {
        loading.dismiss();
        console.log("Error occured.")
      })
  }

}

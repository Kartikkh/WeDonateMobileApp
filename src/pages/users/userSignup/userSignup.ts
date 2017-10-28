import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Constants} from '../../../constant/constant';
import {Http} from '@angular/http';

@Component({
  selector: 'page-users',
  templateUrl: 'userSignup.html',
})
export class userSignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http : Http) {
  }


  userSignUp(form : NgForm){
    console.log(form.value);
    this.http.post(Constants.userSignUp(),form.value).subscribe(
    data=>{
      console.log(data);
    }, err => {
        console.log("Error occured.")
      })
  }

}

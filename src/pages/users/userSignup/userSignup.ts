import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'page-users',
  templateUrl: 'userSignup.html',
})
export class userSignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  userSignUp(form : NgForm){
    console.log(form);
  }

}

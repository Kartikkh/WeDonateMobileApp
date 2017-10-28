import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'page-users',
  templateUrl: 'ngoSignup.html',
})
export class ngoSignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ngoSignUp(form : NgForm ){
    console.log(form);
  }


}

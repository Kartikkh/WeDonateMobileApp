import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ngoSignupPage} from './ngoSignup/ngoSignup';
import {NgForm} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-ngo',
  templateUrl: 'ngo.html',
})

export class NgoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  loginForm(form : NgForm) {
    console.log(form.value);
  }

  onGotoNgoSignup(){
     this.navCtrl.push(ngoSignupPage);
  }

}

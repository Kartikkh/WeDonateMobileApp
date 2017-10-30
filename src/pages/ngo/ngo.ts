import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ngoSignupPage} from './ngoSignup/ngoSignup';
import {NgForm} from "@angular/forms";
import {Http} from '@angular/http';

import {authService} from "../../services/authService";

@IonicPage()
@Component({
  selector: 'page-ngo',
  templateUrl: 'ngo.html',
})

export class NgoPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http : Http,
              private AuthService : authService) {}

  loginForm(form : NgForm) {
    console.log(form.value);
    this.AuthService.loginNgo(form.value)




  }



   logoutUser() {
     this.AuthService.logout();
  }

  onGotoNgoSignup(){
     this.navCtrl.push(ngoSignupPage);
  }



}

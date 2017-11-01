import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ngoSignupPage} from './ngoSignup/ngoSignup';
import {NgForm} from "@angular/forms";
import {ngoAuthService} from "../../services/ngoAuthService";


@IonicPage()
@Component({
  selector: 'page-ngo',
  templateUrl: 'ngo.html',
})


export class NgoPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private ngoAuthService : ngoAuthService) {}

  loginForm(form : NgForm) {
    this.ngoAuthService.loginNgo(form.value);
  }

   logoutUser() {
     this.ngoAuthService.logout();
  }

  onGotoNgoSignup(){
     this.navCtrl.push(ngoSignupPage);
  }



}

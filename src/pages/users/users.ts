import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {userSignupPage} from './userSignup/userSignup'
import {userAuthService} from '../../services/userAuthService'
import {NgForm} from "@angular/forms";
@IonicPage()

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})

export class UsersPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userAuthService:userAuthService) {

  }

  onGotoUserSignup(){
    this.navCtrl.push(userSignupPage);
  }

  UserloginForm(form : NgForm ){
    this.userAuthService.loginUser(form.value);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {userSignupPage} from './userSignup/userSignup'
import {NgForm} from "@angular/forms";
import {authService} from '../../services/authService'

@IonicPage()

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})

export class UsersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , public AuthService : authService) {

  }

  onGotoUserSignup(){
    this.navCtrl.push(userSignupPage);
  }

  UserloginForm(form : NgForm ){
    this.AuthService.loginUser(form.value);
  }

}

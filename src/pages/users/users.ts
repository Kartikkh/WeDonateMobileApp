import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import {userSignupPage} from './userSignup/userSignup'
import {userAuthService} from '../../services/userAuthService'
import {NgForm} from "@angular/forms";
import {userDashboard} from "./dashboard/userDashboard";
import {userResendMail} from "./resendMail/userResendMail";
//import { LoadingController,AlertController } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})

export class UsersPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userAuthService:userAuthService,
              public loadingCtrl: LoadingController) {}



  onGotoUserSignup(){
    this.navCtrl.push(userSignupPage);
  }

  UserloginForm(form : NgForm ){

    this.userAuthService.loginUser(form.value).then(()=>{
        this.navCtrl.setRoot(userDashboard);
    }).catch(err =>{

    })
  }


  userResendMail(){
    this.navCtrl.push(userResendMail)
  }

}


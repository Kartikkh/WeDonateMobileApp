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
    const loading = this.loadingCtrl.create({
      content: 'Logging In !',
      spinner : 'dots'
    });
    loading.present();
    this.userAuthService.loginUser(form.value).then(()=>{
      setTimeout(()=>{
        loading.dismiss();
        this.navCtrl.setRoot(userDashboard);
      },1000);
    }).catch(err =>{

    })
  }


  userResendMail(){
    this.navCtrl.push(userResendMail)
  }

}


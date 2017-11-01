import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {userSignupPage} from './userSignup/userSignup'
import {userAuthService} from '../../services/userAuthService'
import {NgForm} from "@angular/forms";
import {userDashboard} from "./dashboard/userDashboard";
import { LoadingController,AlertController } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})

export class UsersPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userAuthService:userAuthService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {}



  onGotoUserSignup(){
    this.navCtrl.push(userSignupPage);
  }

  UserloginForm(form : NgForm ){

    const alert = this.alertCtrl.create({
      title: 'Sorry for the Inconvenience',
      message: 'Please try again later',
      buttons: ['okay']
    });



      const loading = this.loadingCtrl.create({
        content: 'Please wait! While we are coming up',
        spinner : 'dots'
      });


      this.userAuthService.loginUser(form.value).then(()=>{
      setTimeout(()=>{
        this.navCtrl.push(userDashboard);
      },1000);
    }).catch(err =>{

    })
  }

}

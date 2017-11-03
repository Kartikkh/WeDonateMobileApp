import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {userSignupPage} from './userSignup/userSignup'
import {userAuthService} from '../../services/userAuthService'
import {NgForm} from "@angular/forms";
import {userDashboard} from "./dashboard/userDashboard";
//import { LoadingController,AlertController } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})

export class UsersPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userAuthService:userAuthService) {}



  onGotoUserSignup(){
    this.navCtrl.push(userSignupPage);
  }

  UserloginForm(form : NgForm ){



      this.userAuthService.loginUser(form.value).then(()=>{
      setTimeout(()=>{
        this.navCtrl.push(userDashboard);
      },1000);
    }).catch(err =>{

    })
  }

}

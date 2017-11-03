import { Component } from '@angular/core';
import { NavController ,ViewController } from 'ionic-angular';
import {NavParams} from "ionic-angular";
import {userAuthService} from "../../../services/userAuthService";


@Component({
  templateUrl: 'userDashboard.html'
})

export class userDashboard{
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userAuthService:userAuthService,
              private viewCtrl: ViewController) {

  }

  ionViewCanEnter() {
    return this.userAuthService.isAuthenticated;
  }
  ionViewWillEnter() {
   return  this.viewCtrl.showBackButton(false);
  }



}

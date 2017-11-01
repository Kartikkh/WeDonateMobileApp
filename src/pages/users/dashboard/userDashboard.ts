import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from "ionic-angular";
import {userAuthService} from "../../../services/userAuthService";


@Component({
  templateUrl: 'userDashboard.html'
})

export class userDashboard{
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userAuthService:userAuthService) {

  }

  ionViewCanEnter() {
    return this.userAuthService.isAuthenticated;
  }


}

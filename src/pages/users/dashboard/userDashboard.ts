import { Component } from '@angular/core';
import { NavController,ViewController,PopoverController } from 'ionic-angular';
import {NavParams} from "ionic-angular";
import {userAuthService} from "../../../services/userAuthService";
import {userPopover} from "../sidePopover/sidePopover";

@Component({
  templateUrl: 'userDashboard.html'
})

export class userDashboard{
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userAuthService:userAuthService,
              private viewCtrl: ViewController,
              public popoverCtrl: PopoverController) {}


  ionViewCanEnter() {
    return this.userAuthService.isAuthenticated;
  }

  ionViewWillEnter() {
   return  this.viewCtrl.showBackButton(false);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(userPopover);
    popover.present({
      ev: myEvent
    });
  }



}

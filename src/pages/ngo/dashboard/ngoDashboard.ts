import { Component } from '@angular/core';
import { NavController,ViewController,PopoverController } from 'ionic-angular';
import {ngoAuthService} from "../../../services/ngoAuthService";
import {NavParams} from "ionic-angular";
import {ngoPopover} from "../ngoPopover/ngoPopover";


@Component({
  templateUrl: 'ngoDashboard.html'
})

export class ngoDashboard{

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ngoAuthService:ngoAuthService,
              private viewCtrl: ViewController,
              public popoverCtrl: PopoverController) {

  }

  ionViewCanEnter() {
    return this.ngoAuthService.isAuthenticated;
  }
  ionViewWillEnter() {
    return this.viewCtrl.showBackButton(false);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ngoPopover);
    popover.present({
      ev: myEvent
    });
  }



}

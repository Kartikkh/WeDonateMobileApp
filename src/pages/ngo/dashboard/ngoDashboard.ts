import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ngoAuthService} from "../../../services/ngoAuthService";
import {NavParams} from "ionic-angular";

@Component({
  templateUrl: 'ngoDashboard.html'
})

export class ngoDashboard{

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ngoAuthService:ngoAuthService) {

  }

  ionViewCanEnter() {
    return this.ngoAuthService.isAuthenticated;
  }

}

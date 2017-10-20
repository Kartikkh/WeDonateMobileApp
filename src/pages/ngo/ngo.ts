import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ngoSignupPage} from './ngoSignup/ngoSignup';

@IonicPage()
@Component({
  selector: 'page-ngo',
  templateUrl: 'ngo.html',
})

export class NgoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  onGotoNgoSignup(){
     this.navCtrl.push(ngoSignupPage);
  }

}

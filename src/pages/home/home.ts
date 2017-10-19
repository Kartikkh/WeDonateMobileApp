import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersPage } from '../users/users';
import {NgoPage} from '../ngo/ngo';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  onGotoUser(){
    this.navCtrl.push(UsersPage);
  }
  onGotoNgo(){
    this.navCtrl.push(NgoPage);
  }

}

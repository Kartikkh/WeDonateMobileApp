import { Component } from '@angular/core';
import { ViewController  } from 'ionic-angular';
import {userAuthService} from "../../../services/userAuthService";
import { LoadingController,AlertController } from 'ionic-angular';
import {NavController,App} from "ionic-angular";
import {HomePage} from "../../home/home";


@Component({
 template:`<ion-list>
  <ion-list-header>Ionic</ion-list-header>
  <button ion-item (click)="close()">Learn Ionic</button>
  <button ion-item (click)="Profile()">Profile</button>
  <button ion-item (click)="contactUs()">Contact-Us</button>
  <button ion-item (click)="logout()">LogOut</button>
</ion-list>
`
})
export class userPopover{
  constructor(public viewCtrl: ViewController,
              private UserAuthService :userAuthService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public navCtrl: NavController,public appCtrl: App ) {}

  close() {
    this.viewCtrl.dismiss();
  }

  logout(){

    const loading = this.loadingCtrl.create({
      content: 'Logging Out !',
      spinner : 'dots'
    });

    loading.present();

    this.UserAuthService.logout();
    this.viewCtrl.dismiss();
      setTimeout( () => {
        loading.dismiss();
        this.appCtrl.getRootNav().setRoot(HomePage);
      }, 1500);
  }

  Profile(){

  }

  contactUs(){

  }

}

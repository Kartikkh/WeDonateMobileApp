import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
@IonicPage()

@Component({
  templateUrl: 'followingNgo.html',
})

export class followingEvents {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController) {
  }

}

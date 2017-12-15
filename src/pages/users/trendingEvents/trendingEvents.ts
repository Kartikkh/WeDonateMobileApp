import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
@IonicPage()

@Component({
  templateUrl: 'trendingEvents.html',
})

export class trendingEvents {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController) {
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';


@Component({
  templateUrl: 'trendingEvents.html',
})

export class trendingEvents {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController) {
  }

}

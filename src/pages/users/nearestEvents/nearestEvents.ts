import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
@IonicPage()

@Component({
  templateUrl: 'nearestEvents.html',
})

export class nearestEvents {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController) {
  }

}

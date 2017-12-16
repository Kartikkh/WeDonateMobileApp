import { Component ,ViewChild} from '@angular/core';
import { Nav,NavController,ViewController,PopoverController } from 'ionic-angular';
import {NavParams} from "ionic-angular";
import {userAuthService} from "../../../services/userAuthService";
import {userPopover} from "../sidePopover/sidePopover";
import {followingEvents} from "../followingNgo/followingNgo";
import {trendingEvents} from "../trendingEvents/trendingEvents";
import {nearestEvents} from "../nearestEvents/nearestEvents";

@Component({
  templateUrl: 'userDashboard.html'
})

export class userDashboard{


  @ViewChild(Nav) nav: Nav;

  //
  // FollowingEvents : followingEvents;
  // TrendingEvents  : trendingEvents;
  // NearestEvents   : nearestEvents;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userAuthService:userAuthService,
              private viewCtrl: ViewController,
              public popoverCtrl: PopoverController
            ) {}




  ionViewCanEnter() {
    return this.userAuthService.isAuthenticated;
  }

  ionViewWillEnter() {
   return  this.viewCtrl.showBackButton(false);
  }


  doRefresh(refresher) {

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(userPopover);
    popover.present({
      ev: myEvent
    });
  }

  // openPage(page : any){
  //   console.log(page);
  //  this.nav.setRoot(page);
  // }

  TrendingEvents(){
    this.navCtrl.push(trendingEvents);
  }


}

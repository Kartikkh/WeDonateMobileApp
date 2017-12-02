import { Component } from '@angular/core';
import { NavController,ViewController,PopoverController } from 'ionic-angular';
import {ngoAuthService} from "../../../services/ngoAuthService";
import {NavParams} from "ionic-angular";
import {ngoPopover} from "../ngoPopover/ngoPopover";
import {ModalController} from 'ionic-angular';
import {postEvents} from '../ngoPostEvents/postEvents';
import {Constants} from "../../../constant/constant";
import {HttpClient} from '@angular/common/http';


@Component({
  templateUrl: 'ngoDashboard.html'
})

export class ngoDashboard{

  events : {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ngoAuthService:ngoAuthService,
              public http : HttpClient,
              private viewCtrl: ViewController,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController) {}


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


  postEvent(){
    let modal = this.modalCtrl.create(postEvents);
    modal.present();
  }


  doRefresh(refresher) {
    this.getEvents();
     setTimeout(() => {
      refresher.complete();
    }, 1500);
  }


  getEvents() {
     this.http.get(Constants.getEvents()).subscribe((data)=>{
       this.events= data;
       console.log(data);
    },(error) => {
         console.log(error);
    });
  }


}

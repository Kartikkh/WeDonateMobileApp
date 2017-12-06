import { Component } from '@angular/core';
import {NavController, ViewController, PopoverController, AlertController, LoadingController} from 'ionic-angular';
import {ngoAuthService} from "../../../services/ngoAuthService";
import {NavParams} from "ionic-angular";
import {ngoPopover} from "../ngoPopover/ngoPopover";
import {ModalController} from 'ionic-angular';
import {postEvents} from '../ngoPostEvents/postEvents';
import {Constants} from "../../../constant/constant";
import {HttpClient} from '@angular/common/http';
import {eventDetail} from "../eventDetailPage/eventDetail";

@Component({
  templateUrl: 'ngoDashboard.html'
})

export class ngoDashboard{

  events : {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ngoAuthService:ngoAuthService,
              public http : HttpClient,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private viewCtrl: ViewController,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController) {}


  ionViewCanEnter()  {
    return this.ngoAuthService.isAuthenticated;
  }


  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.getEvents();
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

     setTimeout(() => {
      refresher.complete();
    }, 1500);
  }


  getEvents() {
    const loading = this.loadingCtrl.create({
      content: 'Please Wait !!',
      spinner : 'dots'
    });

    const alert = this.alertCtrl.create({
      title: 'Sorry for the Inconvenience',
      message: 'Please try again later',
      buttons: ['okay']
    });

    loading.present();

    this.http.get(Constants.getEvents()).subscribe((data)=>{
       this.events= data;
      loading.dismiss();
    },(error) => {
      loading.dismiss();
      alert.setMessage("Something went wrong ! Please Try Again ");
      alert.present();
    });
  }



  eventDetail(postId : string){
    console.log(postId);
    this.navCtrl.push(eventDetail, {postid : postId}).catch((error)=>{
      console.log("error");
      this.navCtrl.setRoot(ngoDashboard);
      }
    );
  }

}

import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Constants} from "../../../constant/constant";


@Component({
  templateUrl: 'followingNgo.html',
})

export class followingEvents {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public http : HttpClient,
              public alertCtrl: AlertController) {
  }

  ngoList = {};



  doRefresh(refresher) {

    setTimeout(() => {
      refresher.complete();
    }, 1500);
  }


  presentAlert() {
    const alert = this.alertCtrl.create({
      title: 'Sorry for the Inconvenience',
      message: 'Please Try Again Later !',
      buttons: ['okay']
    });
    alert.present();
  }

  Loading(present : boolean) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait... while we are coming up',
      spinner : 'dots'
    });

    if(present){
      loading.present();
    }else{
      loading.dismiss();
    }
  }



  ionViewWillEnter(){
    this.Loading(true);
    this.http.get(Constants.followedNgoList()).subscribe(
      data=>{
        this.ngoList = data;
      },error=>{
        this.Loading(false);
        this.presentAlert();
      }
    )
  }

}

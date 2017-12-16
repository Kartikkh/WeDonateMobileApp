import {Component} from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Constants} from "../../../constant/constant";
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController,AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'nearestEvents.html'
})

export class nearestEvents {

  events : {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public http : HttpClient,
              private geolocation: Geolocation,
              public alertCtrl: AlertController) {}



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
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.longitude);
      console.log(resp.coords.latitude);
      this.getNearestEvents(resp.coords.longitude,resp.coords.latitude);
    }).catch((error) => {
      this.Loading(false);
      this.presentAlert();

    });
  }


  getNearestEvents(longitude , latitude){
    let params = new HttpParams();
    params = params.append('longitude', longitude);
    params = params.append('latitude', latitude);
    this.http.get(Constants.getNearestEvents() ,{params: params} ).subscribe(
      data=>{
        this.events = data;
      },error=>{
        this.Loading(false);
        this.presentAlert();
      })
  }


}

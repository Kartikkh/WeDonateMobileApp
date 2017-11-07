import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

@Component({
  templateUrl: 'postEvents.html'
})


export class postEvents{

  public event = {
    month: '2017-02-19',
    timeStarts: '09:00',
    timeEnds : '11:00'
  }

  constructor(public platform: Platform,
                 public params: NavParams,
                 public viewCtrl: ViewController,
                  private geolocation: Geolocation,
                   private nativeGeocoder: NativeGeocoder) {}




GetLocation(){
  this.geolocation.getCurrentPosition().then((resp) => {
    console.log(resp.coords.latitude);
    console.log(resp.coords.longitude);
   this.getAddress(resp.coords.latitude,resp.coords.longitude);

  }).catch((error) => {
    console.log('Error getting location', error);
  });

}


getAddress(latitude,longitude){
  console.log(latitude);
  console.log(longitude);
  this.nativeGeocoder.reverseGeocode(latitude, longitude)
    .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
    .catch((error: any) => console.log(error));
}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

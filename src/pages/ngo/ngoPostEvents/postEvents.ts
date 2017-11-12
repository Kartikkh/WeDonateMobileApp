import { Component,OnInit } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import {  FormGroup,FormControl , Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Constants} from "../../../constant/constant";
import { LoadingController,AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'postEvents.html'
})


export class postEvents implements OnInit{

  PostEvent: FormGroup;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              public http : HttpClient,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {}



  ngOnInit(){

    this.PostEvent = new FormGroup({
      description: new FormControl(''),
      ContactNumber: new FormControl(''),
      Location : new FormControl(''),
      date : new FormControl('2017-11-19', Validators.required),
      startTime :new FormControl('09.00', Validators.required),
      endTime :new FormControl('11.00', Validators.required)
    })


  }


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

  Postevent(values : FormGroup){

    const loading = this.loadingCtrl.create({
      content: 'Please wait... while we are coming up',
      spinner : 'dots'
    });

    const alert = this.alertCtrl.create({
      title: 'Sorry for the Inconvenience',
      message: 'Please Try Again Later !',
      buttons: ['okay']
    });

    loading.present();

    console.log(values);
    this.http.post<any>(Constants.postEvents(),values).subscribe(
      data=>{
        console.log(data);
        loading.dismiss();
      },err=>{
        console.log(err);
        loading.dismiss();
        alert.present();

      }
    )


  }

}

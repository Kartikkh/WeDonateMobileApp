import {Component, OnInit} from '@angular/core';
import {NavController, LoadingController, AlertController, NavParams} from 'ionic-angular';
import {Constants} from "../../../constant/constant";
import {HttpClient} from '@angular/common/http';
import {ngoDashboard} from "../dashboard/ngoDashboard";
import {ngoAuthService} from "../../../services/ngoAuthService";

@Component({
  templateUrl: 'ngoProfile.html'
})


export class NgoProfile implements  OnInit{
  ngo : {};

  constructor(public http : HttpClient,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public navCtrl: NavController,public ngoAuthService:ngoAuthService,){}

  ngOnInit(){
    this.ngoProfile();
  }

  ionViewCanEnter()  {
    return this.ngoAuthService.isAuthenticated;
  }


  ngoProfile(){
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

    this.http.get(Constants.getNgoProfile()).subscribe(data=>{
      loading.dismiss();
      this.ngo = data;
      console.log(this.ngo);
    },error=>{
      loading.dismiss();
      alert.setMessage("Something went wrong ! Please Try Again ");
      alert.present();
      this.navCtrl.setRoot(ngoDashboard);
    });


  }

}

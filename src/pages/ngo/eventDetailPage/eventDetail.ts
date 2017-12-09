import {Component, OnInit} from '@angular/core';
import {NavController, ViewController, PopoverController, AlertController, LoadingController} from 'ionic-angular';
import {ngoAuthService} from "../../../services/ngoAuthService";
import {NavParams} from "ionic-angular";
import {Constants} from "../../../constant/constant";
import {HttpClient} from '@angular/common/http';
import {ngoDashboard} from "../dashboard/ngoDashboard";
import {SocialSharing} from "@ionic-native/social-sharing";


@Component({
  templateUrl: 'eventDetail.html'
})

export class eventDetail implements OnInit{

  postId : string;
  eventsDetail= {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ngoAuthService:ngoAuthService,
              public http : HttpClient,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private socialSharing: SocialSharing) {}

  ngOnInit(){
    this.postId = this.navParams.get('postid');
    this.geteventDetail();
  }

  ionViewCanEnter() : boolean | Promise<boolean>{
    return this.ngoAuthService.isAuthenticated;
  }

  geteventDetail(){
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


    this.http.get(Constants.getEventDetails() + this.postId).subscribe(data =>{
             loading.dismiss();
            this.eventsDetail = data;
    },(error)=>{
      loading.dismiss();
      alert.setMessage("Something went wrong ! Please Try Again ");
      alert.present();
      this.navCtrl.setRoot(ngoDashboard);
    })
  }



  share(name ,message){

    const alert = this.alertCtrl.create({
      title: 'Sorry for the Inconvenience',
      message: 'Please try again later',
      buttons: ['okay']
    });

    this.socialSharing.share(name,message).then(() => {

    }).catch(() => {
      alert.present();
    });

  }




}

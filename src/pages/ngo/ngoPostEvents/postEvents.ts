import { Component,OnInit } from '@angular/core';
import { Platform, NavParams, ViewController,NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import {  FormGroup,FormControl , Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Constants} from "../../../constant/constant";
import { LoadingController,AlertController } from 'ionic-angular';
import {ngoDashboard} from "../dashboard/ngoDashboard";
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
@Component({
  templateUrl: 'postEvents.html'
})


export class postEvents implements OnInit{

  PostEvent: FormGroup;
  setLocation: string = "";
   imageChosen: any = 0;
  imagePath: any;
  imageNewPath: any;


  constructor(public platform: Platform,
              public navCtrl: NavController,
              public params: NavParams,
              public viewCtrl: ViewController,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              public http : HttpClient,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private file: File,
              private transfer: FileTransfer) {}

  Longitude = new FormControl(0);
  Latitude = new FormControl(0);
  Location = new FormControl('');


  ngOnInit(){

    this.PostEvent = new FormGroup({
      description: new FormControl(''),
      contactNumber: new FormControl(''),

      authorisedPerson : new FormControl(''),
      date : new FormControl('2017-11-19', Validators.required),
      startTime :new FormControl('09.00', Validators.required),
      endTime :new FormControl('11.00', Validators.required),
      longitude : this.Longitude,
      latitude : this.Latitude,
      Location : this.Location
    })
  }


  GetLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.Longitude.setValue(resp.coords.longitude);
      this.Latitude.setValue(resp.coords.latitude);
      this.getAddress(resp.coords.latitude,resp.coords.longitude);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  getAddress(latitude,longitude){
    this.nativeGeocoder.reverseGeocode(latitude, longitude)
      .then((result: NativeGeocoderReverseResult) =>{
         this.setLocation = JSON.stringify(result);
        this.Location.setValue(result);
      })
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
        this.navCtrl.setRoot(ngoDashboard);
        loading.dismiss();
      },err=>{
        console.log(err);
        loading.dismiss();
        alert.present();

      }
    )


  }



  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Picture Source',
      buttons: [
        {
          text: 'Gallery',
          icon: 'albums',
          handler: () => {
            this.actionHandler(1);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.actionHandler(2);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',

        }
      ]
    });

    actionSheet.present();
  }

  actionHandler(selection: any) {




    if (selection == 1) {
      const options: CameraOptions = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      };



    } else {
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,

      };

      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
      });

    }

  }


}

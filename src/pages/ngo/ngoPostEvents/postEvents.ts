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


declare var cordova: any;
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

  fileTransfer: FileTransferObject = this.transfer.create();


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
          this.actionHandler(1)
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.actionHandler(2)
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
    var options: any;

    if (selection == 1) {
      options = {
        quality: 75,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      };
    } else {
      options = {
        quality: 75,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      };
    }
    this.getImage(options)
  }

  getImage(options){
      this.camera.getPicture(options).then((imgUrl) => {
        var sourceDirectory = imgUrl.substring(0, imgUrl.lastIndexOf('/') + 1);
        var sourceFileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1, imgUrl.length);
        sourceFileName = sourceFileName.split('?').shift();
        this.file.copyFile(sourceDirectory, sourceFileName, cordova.file.externalApplicationStorageDirectory , sourceFileName).then((result: any) => {
          this.imagePath = imgUrl;
          this.imageChosen = 1;
          this.imageNewPath = result.nativeURL;

        }, (err) => {
          alert(JSON.stringify(err));
        })
      }, (err) => {
        // Handle error
      });

    }


  uploadPhoto() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

     var filename = this.imagePath.split('/').pop();

     let options : FileUploadOptions  = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg",
     };


    this.http.post(Constants.postImage(),filename).subscribe((data)=>{
      options.params = {
          "key": filename,
          "AWSAccessKeyId": data['awsKey'],
          "acl": "public-read",
          "policy": data['policy'],
          "signature": data['signature'],
          "Content-Type": "image/jpeg"
      };

      this.fileTransfer.upload(this.imageNewPath ,"https://" + data['bucket'] + ".s3.amazonaws.com/",options).then((s3data) => {
        this.imagePath = '';
        this.imageChosen = 0;
        console.log(s3data);
        loader.dismiss();
      }, (err) => {
        alert(JSON.stringify(err));
      });

    },()=>{

    })


  }

}

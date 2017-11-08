import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Constants } from '../../../constant/constant';
import { LoadingController } from 'ionic-angular';

import {NgForm} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Constants} from '../../../constant/constant';
import { LoadingController,AlertController } from 'ionic-angular';



@Component({
  selector: 'page-users',
  templateUrl: 'ngoSignup.html'
})
export class ngoSignupPage {
  ngoForm: FormGroup;


  constructor(public loadingCtrl: LoadingController,
              public http: Http, private _fb: FormBuilder) {
    this.ngoForm = this._fb.group({
      ngoName: ['', Validators.required],
      regNo: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      contactNo: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngoSignUp() {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public http : HttpClient,
              public alertCtrl: AlertController) {}

  ngoSignUp(form : NgForm ){


    const loading = this.loadingCtrl.create({
      content: 'Please wait... while we are coming up',
      spinner : 'dots'
    });

    const alert = this.alertCtrl.create({
      title: 'Sorry for the Inconvenience',
      message: 'Please try again later',
      buttons: ['okay']
    });

    loading.present();

    this.http.post(Constants.ngoSignup(), this.ngoForm.value).subscribe(
      data => {
        loading.dismiss();
        console.log(data);
      }, err => {
        loading.dismiss();
        console.log('Error occured.')
      })

    this.http.post<any>(Constants.ngoSignup(),form.value).subscribe(
      (data:Response)=>{
        loading.dismiss();
        console.log(data);
        if(data['message'] === "Registration already exits"){
          alert.setMessage("Ngo with Given Registration Id already exits");
          alert.present();
        }
        else if (data['message'] === "You have Signed-Up successfully, but Verification Email could not be Sent. Try again later."){
          alert.setTitle("Please verify your account after login");
          alert.setMessage("You have Signed-Up successfully, but Verification Email could not be Sent");
          alert.present();
        }

      }, err => {
        loading.dismiss();
        alert.present();
      })


  }


}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Constants } from '../../../constant/constant';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-users',
  templateUrl: 'userSignup.html',
})
export class userSignupPage {
  public userForm: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    private _fb: FormBuilder) {
    this.userForm = this._fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }


  userSignUp() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.http.post(Constants.userSignUp(), this.userForm.value).subscribe(
      data => {
        console.log(data);
        loading.dismiss();
      }, err => {
        loading.dismiss();
        console.log("Error occured.")
      })
  }

}

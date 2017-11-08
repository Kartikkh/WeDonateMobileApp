import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Constants } from '../../../constant/constant';
import { LoadingController } from 'ionic-angular';


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
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
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
  }


}

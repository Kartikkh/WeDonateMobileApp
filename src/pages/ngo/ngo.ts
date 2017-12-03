import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController } from 'ionic-angular';
import {ngoSignupPage} from './ngoSignup/ngoSignup';
import {NgForm} from "@angular/forms";
import {ngoAuthService} from "../../services/ngoAuthService";
import {ngoDashboard} from "./dashboard/ngoDashboard";
import {ResendMail} from './resendMail/resendMail'



@IonicPage()

@Component({
  selector: 'page-ngo',
  templateUrl: 'ngo.html',
})


export class NgoPage {

  constructor(public navCtrl: NavController,
              private ngoAuthService : ngoAuthService,
              public loadingCtrl: LoadingController
             ){}


  loginForm(form : NgForm) {


    this.ngoAuthService.loginNgo(form.value).then(()=>{
        this.navCtrl.setRoot(ngoDashboard)
    }).catch(error=>{
    })
  }

  onGotoNgoSignup(){
     this.navCtrl.push(ngoSignupPage);
  }



  resendMail(){
    this.navCtrl.push(ResendMail);
  }



}

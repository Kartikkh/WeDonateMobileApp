import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgoPage } from './ngo';

@NgModule({
  declarations: [
    NgoPage,
  ],
  imports: [
    IonicPageModule.forChild(NgoPage),
  ],
})
export class NgoPageModule {}

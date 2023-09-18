import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissinfoPage } from './missinfo';

@NgModule({
  declarations: [
    MissinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MissinfoPage),
  ],
})
export class MissinfoPageModule {}

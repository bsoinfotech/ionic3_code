import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsinfoPage } from './termsinfo';

@NgModule({
  declarations: [
    TermsinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(TermsinfoPage),
  ],
})
export class TermsinfoPageModule {}

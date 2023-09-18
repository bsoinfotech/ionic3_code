import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrimaryBusinessPage } from './primary-business';

@NgModule({
  declarations: [
    PrimaryBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(PrimaryBusinessPage),
  ],
})
export class PrimaryBusinessPageModule {}

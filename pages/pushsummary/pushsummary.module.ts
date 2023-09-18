import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PushsummaryPage } from './pushsummary';

@NgModule({
  declarations: [
    PushsummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(PushsummaryPage),
  ],
})
export class PushsummaryPageModule {}

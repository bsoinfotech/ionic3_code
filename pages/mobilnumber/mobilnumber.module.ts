import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobilnumberPage } from './mobilnumber';

@NgModule({
  declarations: [
    MobilnumberPage,
  ],
  imports: [
    IonicPageModule.forChild(MobilnumberPage),
  ],
})
export class MobilnumberPageModule {}

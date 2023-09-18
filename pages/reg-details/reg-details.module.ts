import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegDetailsPage } from './reg-details';

@NgModule({
  declarations: [
    RegDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RegDetailsPage),
  ],
})
export class RegDetailsPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailAddressPage } from './detail-address';

@NgModule({
  declarations: [
    DetailAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailAddressPage),
  ],
})
export class DetailAddressPageModule {}

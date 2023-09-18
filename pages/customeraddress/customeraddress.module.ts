import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomeraddressPage } from './customeraddress';

@NgModule({
  declarations: [
    CustomeraddressPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomeraddressPage),
  ],
})
export class CustomeraddressPageModule {}

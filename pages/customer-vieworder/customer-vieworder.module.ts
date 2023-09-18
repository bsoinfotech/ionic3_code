import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerVieworderPage } from './customer-vieworder';

@NgModule({
  declarations: [
    CustomerVieworderPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerVieworderPage),
  ],
})
export class CustomerVieworderPageModule {}

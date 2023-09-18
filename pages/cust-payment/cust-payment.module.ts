import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustPaymentPage } from './cust-payment';

@NgModule({
  declarations: [
    CustPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(CustPaymentPage),
  ],
})
export class CustPaymentPageModule {}

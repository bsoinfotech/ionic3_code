import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentpagePage } from './paymentpage';

@NgModule({
  declarations: [
    PaymentpagePage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentpagePage),
  ],
})
export class PaymentpagePageModule {}

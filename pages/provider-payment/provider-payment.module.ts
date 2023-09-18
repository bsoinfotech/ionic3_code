import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderPaymentPage } from './provider-payment';

@NgModule({
  declarations: [
    ProviderPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderPaymentPage),
  ],
})
export class ProviderPaymentPageModule {}

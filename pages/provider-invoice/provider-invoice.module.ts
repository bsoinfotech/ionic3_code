import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderInvoicePage } from './provider-invoice';

@NgModule({
  declarations: [
    ProviderInvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderInvoicePage),
  ],
})
export class ProviderInvoicePageModule {}

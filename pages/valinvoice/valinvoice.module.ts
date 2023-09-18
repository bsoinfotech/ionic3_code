import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValinvoicePage } from './valinvoice';

@NgModule({
  declarations: [
    ValinvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(ValinvoicePage),
  ],
})
export class ValinvoicePageModule {}

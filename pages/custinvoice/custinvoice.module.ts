import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustinvoicePage } from './custinvoice';

@NgModule({
  declarations: [
    CustinvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(CustinvoicePage),
  ],
})
export class CustinvoicePageModule {}

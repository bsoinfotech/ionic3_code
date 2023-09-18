import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankdetailsPage } from './bankdetails';

@NgModule({
  declarations: [
    BankdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BankdetailsPage),
  ],
})
export class BankdetailsPageModule {}

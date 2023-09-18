import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletdetailsPage } from './walletdetails';

@NgModule({
  declarations: [
    WalletdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletdetailsPage),
  ],
})
export class WalletdetailsPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamInvoicePage } from './team-invoice';

@NgModule({
  declarations: [
    TeamInvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(TeamInvoicePage),
  ],
})
export class TeamInvoicePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewleadsPage } from './newleads';

@NgModule({
  declarations: [
    NewleadsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewleadsPage),
  ],
})
export class NewleadsPageModule {}

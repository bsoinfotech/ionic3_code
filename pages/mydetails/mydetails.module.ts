import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MydetailsPage } from './mydetails';

@NgModule({
  declarations: [
    MydetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MydetailsPage),
  ],
})
export class MydetailsPageModule {}

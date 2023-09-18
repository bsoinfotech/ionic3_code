import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddcatPage } from './addcat';

@NgModule({
  declarations: [
    AddcatPage,
  ],
  imports: [
    IonicPageModule.forChild(AddcatPage),
  ],
})
export class AddcatPageModule {}

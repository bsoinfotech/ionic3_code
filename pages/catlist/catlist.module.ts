import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatlistPage } from './catlist';

@NgModule({
  declarations: [
    CatlistPage,
  ],
  imports: [
    IonicPageModule.forChild(CatlistPage),
  ],
})
export class CatlistPageModule {}

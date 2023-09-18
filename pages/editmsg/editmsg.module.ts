import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditmsgPage } from './editmsg';

@NgModule({
  declarations: [
    EditmsgPage,
  ],
  imports: [
    IonicPageModule.forChild(EditmsgPage),
  ],
})
export class EditmsgPageModule {}

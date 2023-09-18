import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomernotePage } from './customernote';

@NgModule({
  declarations: [
    CustomernotePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomernotePage),
  ],
})
export class CustomernotePageModule {}

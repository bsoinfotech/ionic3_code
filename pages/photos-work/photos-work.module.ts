import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotosWorkPage } from './photos-work';

@NgModule({
  declarations: [
    PhotosWorkPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotosWorkPage),
  ],
})
export class PhotosWorkPageModule {}

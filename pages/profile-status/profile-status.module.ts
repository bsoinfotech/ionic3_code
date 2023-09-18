import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileStatusPage } from './profile-status';

@NgModule({
  declarations: [
    ProfileStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileStatusPage),
  ],
})
export class ProfileStatusPageModule {}

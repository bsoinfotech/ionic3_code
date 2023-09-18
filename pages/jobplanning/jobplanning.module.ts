import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobplanningPage } from './jobplanning';

@NgModule({
  declarations: [
    JobplanningPage,
  ],
  imports: [
    IonicPageModule.forChild(JobplanningPage),
  ],
})
export class JobplanningPageModule {}

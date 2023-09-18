import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceLocationPage } from './service-location';

@NgModule({
  declarations: [
    ServiceLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceLocationPage),
  ],
})
export class ServiceLocationPageModule {}

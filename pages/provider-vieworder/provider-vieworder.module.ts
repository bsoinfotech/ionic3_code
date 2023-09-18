import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderVieworderPage } from './provider-vieworder';

@NgModule({
  declarations: [
    ProviderVieworderPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderVieworderPage),
  ],
})
export class ProviderVieworderPageModule {}

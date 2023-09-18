import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaproutePage } from './maproute';

@NgModule({
  declarations: [
    MaproutePage,
  ],
  imports: [
    IonicPageModule.forChild(MaproutePage),
  ],
})
export class MaproutePageModule {}

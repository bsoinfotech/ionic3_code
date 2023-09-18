import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgentmanagementPage } from './agentmanagement';

@NgModule({
  declarations: [
    AgentmanagementPage,
  ],
  imports: [
    IonicPageModule.forChild(AgentmanagementPage),
  ],
})
export class AgentmanagementPageModule {}

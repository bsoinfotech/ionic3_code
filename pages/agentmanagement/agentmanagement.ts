import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-agentmanagement',
  templateUrl: 'agentmanagement.html',
})
export class AgentmanagementPage {
agentdetails:any;
nval:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public general: General,public api: Api,public user: User, private storage: Storage, public modalCtrl: ModalController) {

  			//this.storage.get('userid').then((userid) => {
	  		this.api.post('getagentalldetails',{userid:localStorage.getItem('userid')}).subscribe((res:any) => {
	  			if(res.status=='success')
	  			{
	  				this.nval=true;
	  				this.agentdetails=res.agentdetails;
	  			}
	  			else
	  			{
	  				this.nval=false;
	  				this.agentdetails=res.agentdetails;
	  			}  			
	  		});
  	  //});
  }

  addAgent()
  {
      let contactModal = this.modalCtrl.create('AddagentPage');
        contactModal.onDidDismiss(data =>{ 
            this.agentdetails=data;
        });
        contactModal.present();
  }

  viewDetails(aid)
  {
  		this.navCtrl.push('ViewagentdetailsPage',{aid:aid});
  }

  editDetails(aid)
  {
  let contactModal = this.modalCtrl.create('EditagentPage',{aid:aid});
        contactModal.onDidDismiss(data =>{ 
            this.agentdetails=data;
        });
        contactModal.present();
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgentmanagementPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-viewagentdetails',
  templateUrl: 'viewagentdetails.html',
})
export class ViewagentdetailsPage {
agentdetails:any;
aid:any;
special:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public general: General,public api: Api,public user: User, private storage: Storage, public modalCtrl: ModalController) {

  this.aid=this.navParams.get('aid');
  			this.storage.get('userid').then((userid) => {
		  		this.api.post('viewagentalldetails',{userid:userid, aid:this.aid}).subscribe((res:any) => {
		  				this.agentdetails=res.agentdetails;
              this.special=res.special;
		  		});
	  		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewagentdetailsPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-jobhistory',
  templateUrl: 'jobhistory.html',
})
export class JobhistoryPage {

  history:any;
nval:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
	  this.storage.get('userid').then((userid) => {
	  		this.api.post('gethistoryjobs',{userid:userid}).subscribe((res:any) => {
	  			if(res.status=='success')
	  			{
	  				this.nval=true;
	  				this.history=res.history;
	  			}
	  			else
	  			{
	  				this.nval=false;
	  				this.history=res.history;
	  			}
	  			
	  		});
  	  });
  }
  
gotoBack()
  {

	  this.navCtrl.setRoot('JobPage');
  }

  goOngoing()
  {
  this.navCtrl.setRoot('OngoingjobsPage');
  }

viewProject(order_num)
{
	this.navCtrl.push('ViewprojectPage',{order_num:order_num});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad JobhistoryPage');
  }

}




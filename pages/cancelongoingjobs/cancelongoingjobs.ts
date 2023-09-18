import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-cancelongoingjobs',
  templateUrl: 'cancelongoingjobs.html',
})
export class CancelongoingjobsPage {

	canceljobs:any;
	nval2:any;
  userid:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

	 // this.storage.get('userid').then((userid) => {
    this.userid=this.navParams.get('userid'); 
	  		this.api.post('canceljobworkflowmangment',{userid:this.userid}).subscribe((res:any) => {
	  			if(res.status2=='success')
	  			{
	  				this.nval2=true;
	  				this.canceljobs=res.canceljobs;
	  			}
	  			else
	  			{
	  				this.nval2=false;
	  				this.canceljobs=res.canceljobs;
	  			}	  			
	  		});
  	//  });
  }

  goHome()
  {
    this.navCtrl.setRoot('DashboardPage',{userid:this.userid});
  }

   goacceptedPage()
  {
  		this.navCtrl.setRoot('JobplanningPage',{userid:this.userid});
  }
   gotodayPage()
  {
  		this.navCtrl.setRoot('TodayongoingjobsPage',{userid:this.userid});
  }
   gotomorrowPage()
  {
  		this.navCtrl.setRoot('TomorrowongoingjobsPage',{userid:this.userid});
  }

   goviewproject(order_num)
  {
  		this.navCtrl.push('ProviderViewprojectPage', {userid:this.userid,order_num:order_num});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelongoingjobsPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-jobplanning',
  templateUrl: 'jobplanning.html',
})
export class JobplanningPage {
  todayjobs:any;
	nval:any;
	tomorrowjob:any;
	canceljobs:any;
	nval1:any;
	nval2:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

	  this.storage.get('userid').then((userid) => {
	  		this.api.post('jobworkflowmangment',{userid:userid}).subscribe((res:any) => {
	  			if(res.status=='success')
	  			{
	  				this.nval=true;
	  				this.todayjobs=res.todayjobs;
	  			}
	  			else
	  			{
	  				this.nval=false;
	  				this.todayjobs=res.todayjobs;
	  			}


	  			if(res.status1=='success')
	  			{
	  				this.nval1=true;
	  				this.tomorrowjob=res.tomorrowjob;
	  			}
	  			else
	  			{
	  				this.nval1=false;
	  				this.tomorrowjob=res.tomorrowjob;
	  			}

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
  	  });
  }

  gotodayPage()
  {
  		this.navCtrl.setRoot('TodayongoingjobsPage');
  }
  gotomorrowPage()
  {
  		this.navCtrl.setRoot('TomorrowongoingjobsPage');
  }
  gocancelPage()
  {
  		this.navCtrl.setRoot('CancelongoingjobsPage');
  }

  goviewproject(order_num)
  {
  		this.navCtrl.push('ProviderViewprojectPage', {order_num:order_num});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad JobplanningPage');
  }

}

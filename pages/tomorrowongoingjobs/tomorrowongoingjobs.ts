import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-tomorrowongoingjobs',
  templateUrl: 'tomorrowongoingjobs.html',
})
export class TomorrowongoingjobsPage {

	tomorrowjob:any;
	nval1:any;
	userid:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

	this.userid=this.navParams.get('userid');
	//alert('user='+this.user_id);
	
	/*
	
	this.storage.get('userid').then((userid) => {
		  
alert('user1='+this.user_id);
		  
	  		this.api.post('tomorrowjobworkflowmangment',{userid:this.userid}).subscribe((res:any) => {
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
	  		});
  	  });
	  
	  */
  }

  goacceptedPage()
  {
  		this.navCtrl.setRoot('JobplanningPage',{userid:this.userid});
  }
   gotodayPage()
  {
  		this.navCtrl.setRoot('TodayongoingjobsPage',{userid:this.userid});
  }
  gocancelPage()
  {
  		this.navCtrl.setRoot('CancelongoingjobsPage',{userid:this.userid});
  }
   goviewproject(order_num)
  {
  		this.navCtrl.push('ProviderViewprojectPage', {order_num:order_num,userid:this.userid});
  }
  goHome()
  {
    this.navCtrl.setRoot('DashboardPage',{userid:this.userid});
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad TomorrowongoingjobsPage');
	this.general.showLoading();
	this.userid=this.navParams.get('userid'); 
		//this.storage.get('userid').then((userid) => {
		  
//alert('user1='+userid);
		  
	  		this.api.post('tomorrowjobworkflowmangment',{userid:this.userid}).subscribe((res:any) => {
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
				this.general.hideLoading();				
	  		});
  	 // });
  }

}

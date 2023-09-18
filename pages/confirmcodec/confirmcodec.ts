import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-confirmcodec',
  templateUrl: 'confirmcodec.html',
})
export class ConfirmcodecPage {
order_num:any;
cust_id:any;
userid:any;
directdata:any;
viewproject:any;
viewprojectstatus:any;
random:any;
compnote:any;
todayjobs:any;


  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) 
  {
		this.order_num=this.navParams.get('order_num');
		this.userid=this.navParams.get('userid');
		this.cust_id=this.navParams.get('cust_id');
		if(!this.userid)
		{
			this.userid=localStorage.getItem('userid');
		}

  }

    dismiss() 
   {
     this.viewCtrl.dismiss();
   }
   addNewOrder()
   {
			/*	
			if(this.random=='' || this.random==undefined)
			{
					let toast = this.toastCtrl.create({
					            message: 'Enter Job Completion Code',
					            duration: 3000,
					            position: 'bottom'
					        });
					        toast.present();
			}
			else 
			*/
			if(this.compnote=='' || this.compnote==undefined)
			{
					let toast = this.toastCtrl.create({
					            message: 'Enter Job Completion Note',
					            duration: 3000,
					            position: 'bottom'
					        });
					        toast.present();
			}				
			else			
			{
   		//this.storage.get('userid').then((userid) => {
	  		this.api.post('jobcompcode',{userid:this.userid, order_num:this.order_num,random:this.random,compnote:this.compnote}).subscribe((res:any) => {
	  				if(res.status=='success')
	  				{
	  						let toast = this.toastCtrl.create({
					            message: 'Job Completed successfully',
					            duration: 3000,
					            position: 'bottom'
					        });
					        toast.present();

							this.navCtrl.setRoot('TodayongoingjobsPage',{userid:this.userid});



	  				}
	  				else
	  				{
	  						let toast = this.toastCtrl.create({
					            message: 'Invalid Job Completion Code',
					            duration: 3000,
					            position: 'bottom'
					        });
					        toast.present();
							

	  				}
	  				
	  		});
	  	//});
	  	}
   }
  ionViewDidLoad() {
   console.log('ionViewDidLoad ConfirmcodecPage');
  }

}


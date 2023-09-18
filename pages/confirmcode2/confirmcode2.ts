import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-confirmcode2',
  templateUrl: 'confirmcode2.html',
})
export class Confirmcode2Page {
order_num:any;
directdata:any;
viewproject:any;
viewprojectstatus:any;
random:any;
todayjobs:any;
popular:any;
popular1:any;
cancel_reason:any;
cancel_id:any;

cancel_reason1:any;
cancel_id1:any;


  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, 
  private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) {
  this.order_num=this.navParams.get('order_num');
  
 // alert('order_num='+this.order_num);
 
 			// added by biplab Apr08 2020
			//this.storage.get('userid').then((userid) => {
				this.api.post("compldelayreason", { userid:localStorage.getItem('userid')}).subscribe((resp:any) => {
				this.popular=resp.popular;
				this.popular1=resp.popular1;
				});
			//});
  }


updateCucumber(cancel_id,cancel_reason)
{
  this.cancel_reason='';
  this.cancel_id=cancel_id;
  this.cancel_reason=cancel_reason;
}

updateCucumber1(cancel_id1,cancel_reason1)
{
  this.cancel_reason1='';
  this.cancel_id1=cancel_id1;
  this.cancel_reason1=cancel_reason1;
}

	submit_wipreason(order_num)
	{


	  if(this.cancel_id=='' || this.cancel_id==undefined)
		  {
			  let toast = this.toastCtrl.create({
				  message: 'Select Delay Reason',
				  duration: 3000,
				  position: 'bottom'
			  });
			  toast.present();
		  }
		  else if (this.cancel_id1=='' || this.cancel_id1==undefined)
		  {
					let toast = this.toastCtrl.create({
				  message: 'Select time when you will complete the job ',
				  duration: 3000,
				  position: 'bottom'
			  });
			  toast.present();

		  }
		else
		{
	 // ------------------------------------------------------------------
	 
		let alert = this.alertCtrl.create({
		title: 'You are commiting to complete this job '+this.cancel_reason1+'.  Click Ok to Proceed',
		message: '',
		buttons: [
		  {
			text: 'Cancel',
			role: 'cancel',
			handler: () => {
			  console.log('Cancel clicked');
			}
		  },
		  {
			text: 'Ok',
			handler: () => {
				
			let loading = this.loadingCtrl.create({
			spinner:'hide',
			content: '<img src="assets/img/busy.gif">',
			dismissOnPageChange: true 
			});
			loading.present();
			  
						//this.storage.get('userid').then(userid=>{
							
		
							 this.api.post("jobwip_delay", { order_num:this.order_num,userid:localStorage.getItem('userid'),cancel_id:this.cancel_id,cancel_reason:this.cancel_reason,cancel_id1:this.cancel_id1,cancel_reason1:this.cancel_reason1}).subscribe((res1:any) => {
							loading.dismiss();
									 if(res1.status=='success')
									  {
										   let toast = this.toastCtrl.create({
												  message: 'Your request submitted successfully ',
												  duration: 3000,
												  position: 'bottom'
											  });
											  toast.present();
											  // biplab phase2 0729 - back to invoice screen after received the payment
											  //this.navCtrl.push('ProviderInvoicePage', {order_num:order_num});
											 // this.navCtrl.push('JobhistoryPage');
											 this.viewCtrl.dismiss();


									   }
								});
							//});
			}
		  }
		]
	  });
	  alert.present(); 
		}

	}


	dismiss() 
	{
		this.viewCtrl.dismiss();
	}
	   
	   
	   
	ionViewDidLoad() 
	{
		console.log('ionViewDidLoad Confirmcode2Page');
	}

}




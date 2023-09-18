import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-confirmcode1',
  templateUrl: 'confirmcode1.html',
})
export class Confirmcode1Page {
order_num:any;
directdata:any;
viewproject:any;
viewprojectstatus:any;
random:any;
todayjobs:any;
popular:any;
cancel_reason:any;
cancel_id:any;



  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, 
  private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) {
  this.order_num=this.navParams.get('order_num');
  
 // alert('order_num='+this.order_num);
 
 			// added by biplab Apr08 2020
			//this.storage.get('userid').then((userid) => {
				this.api.post("jobdelayreason", { userid:localStorage.getItem('userid')}).subscribe((resp:any) => {
				this.popular=resp.popular;
				});
			//});
  }


updateCucumber(cancel_id,cancel_reason)
{
  this.cancel_reason='';
  this.cancel_id=cancel_id;
  this.cancel_reason=cancel_reason;
}

	submit_reason(order_num)
	{


	  if(this.cancel_id=='' || this.cancel_id==undefined)
		  {
			  let toast = this.toastCtrl.create({
				  message: 'Select Reason for Delay in Job Start',
				  duration: 3000,
				  position: 'bottom'
			  });
			  toast.present();
		  }
		  else
		  {

	  
	  
	 // ------------------------------------------------------------------
	 
		let alert = this.alertCtrl.create({
		title: 'are you sure you want submit this reason?  Click Ok to Proceed',
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
							
		
							 this.api.post("jobdelay_start", { order_num:this.order_num,userid:localStorage.getItem('userid'),cancel_id:this.cancel_id,cancel_reason:this.cancel_reason}).subscribe((res1:any) => {
							loading.dismiss();
									 if(res1.status=='success')
									  {
										   let toast = this.toastCtrl.create({
												  message: 'Reason submitted successfully ',
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
		console.log('ionViewDidLoad Confirmcode1Page');
	}

}



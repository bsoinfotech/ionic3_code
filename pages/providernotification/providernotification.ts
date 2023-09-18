import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ModalController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-providernotification',
  templateUrl: 'providernotification.html',
})
export class ProvidernotificationPage {

 nval:any;
notifications:any;
not_count:any;
userid:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController, public viewCtrl: ViewController) 
  {
	this.userid=this.navParams.get('userid');
  		//this.storage.get('userid').then((userid) => {
	  		this.api.post('getnotifications',{userid:this.userid}).subscribe((res:any) => {
	  			if(res.status=='success')
	  			{
	  				this.nval=true;
	  				this.notifications=res.notifications;	  			}
	  			else
	  			{
	  				this.nval=false;
	  				this.notifications=res.notifications;
	  			}
	  		});
  	   // });

  }

  viewProject(order_num,notid)
  {

  			

  		this.api.post('changenotification',{notid:notid}).subscribe((res:any) => {
	        if(res.status=='success')
	        {
				if (res.ref5==0)   //added biplab phase3 0918
				{
	        		let contactModal = this.modalCtrl.create('ProviderViewprojectPage', {order_num:order_num,not:'notification'});
				        contactModal.onDidDismiss(data =>{ 
				            this.notifications=data;
				        });
				        contactModal.present();
				}
				else
				{
					let toast = this.toastCtrl.create({
					message: 'No detail available',
					duration: 3000,
					position: 'bottom'
					});
					toast.present();		
					
				}
						
						
			}
		});
  }

  dismiss()
  {
  		//this.storage.get('userid').then(userid=>{
        this.api.post('getnotificationscount',{userid:this.userid}).subscribe((res:any) => {
                  this.not_count=res.not_count;
                  this.viewCtrl.dismiss(this.not_count);
        });
   // }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvidernotificationPage');
  }

}

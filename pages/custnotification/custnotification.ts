import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController, ModalController} from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-custnotification',
  templateUrl: 'custnotification.html',
})
export class CustnotificationPage {
nval:any;
notifications:any;
not_count:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController, public modalCtrl: ModalController) 
  {
/*  	
	this.storage.get('userid').then((userid) => {
	  		this.api.post('getnotifications',{userid:userid}).subscribe((res:any) => {
	  			if(res.status=='success')
	  			{
	  				this.nval=true;
	  				this.notifications=res.notifications;
	  			
	  			}
	  			else
	  			{
	  				this.nval=false;
	  				this.notifications=res.notifications;
	  			}
	  			
	  		});
  	  });
*/
  }

   dismiss()
  {
  		this.storage.get('userid').then(userid=>{
        this.api.post('getnotificationscount',{userid:userid}).subscribe((res:any) => {
                  this.not_count=res.not_count;
                  this.viewCtrl.dismiss(this.not_count);
        });
    }); 
  }
  
/* biplab phase2 0804 added show_detail
//viewProject(order_num,notid)
 {
        this.api.post('changenotification',{notid:notid}).subscribe((res:any) => {
	        if(res.status=='success')
	        {
				let contactModal = this.modalCtrl.create('ViewprojectPage', {order_num:order_num,not:'notification'});
				        contactModal.onDidDismiss(data =>{ 
				            this.notifications=data;
				        });
				        contactModal.present();
				
			}
		});
 }
*/
//biplab phase2 0804 added show_detail
  viewProject(order_num,notid,show_detail)
 {
        this.api.post('changenotification',{notid:notid}).subscribe((res:any) => {
	        if(res.status=='success')
	        {
				if(show_detail==0)
				{
				let contactModal = this.modalCtrl.create('ViewprojectPage', {order_num:order_num,not:'notification'});
				        contactModal.onDidDismiss(data =>{ 
				            this.notifications=data;
				        });
				        contactModal.present();
				}
				else
				{
						let toast = this.toastCtrl.create({
						message: 'Detail not available',
						duration: 3000,
						position: 'bottom'
					});
					toast.present();
				}
			}
		});
 }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad CustnotificationPage');
	
	
			let loading =  this.loadingCtrl.create({
		spinner:'hide',
		content: '<img src="assets/img/busy.gif">',
		duration: 3000
		});
		 loading.present();
		 
	  		this.storage.get('userid').then((userid) => {
	  		this.api.post('getnotifications',{userid:userid}).subscribe((res:any) => {
			loading.dismiss();	
				
	  			if(res.status=='success')
	  			{
	  				this.nval=true;
	  				this.notifications=res.notifications;
	  			
	  			}
	  			else
	  			{
	  				this.nval=false;
	  				this.notifications=res.notifications;
	  			}
	  			
	  		});
  	  });
  }
  
refresh_screen()
{
    //this.navCtrl.setRoot('DashboardPage');
}

}

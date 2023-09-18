import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-changeproposeprice',
  templateUrl: 'changeproposeprice.html',
})
export class ChangeproposepricePage {
order_num:any;
startdate:any;
starttime:any;
orderheader:any;
orderdtl:any;
directdata:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) {
  		this.order_num=this.navParams.get('order_num');
       this.storage.get('userid').then((userid) => {
	  		this.api.post('getresheduledttm',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
	  				this.startdate=res.scheduledata.startdate;
	  				this.starttime=res.scheduledata.starttime;	  				
	  		});
	  	});

  }

   dismiss() 
   {
     this.viewCtrl.dismiss();
   }

   editOrder()
   {
   	this.storage.get('userid').then((userid) => {
	  		this.api.post('changeproviderdatetime',{userid:userid, order_num:this.order_num,startdate:this.startdate,starttime:this.starttime}).subscribe((res:any) => {
	  				if(res.status=='success')
	  				{
	  						let toast = this.toastCtrl.create({
					            message: 'Successfully Updated',
					            duration: 3000,
					            position: 'bottom'
					        });
					        toast.present();


					        this.storage.get('userid').then((userid) => {
						          this.api.post('viewleadsmanagement',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
						              this.orderdtl=res.orderdtl;
						              this.orderheader=res.orderheader;
						              this.directdata=[this.orderdtl,this.orderheader];
						  				this.viewCtrl.dismiss(this.directdata);
						            
						          });
						        });
	  				}
	  				
	  		});
	  	});
   }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeproposepricePage');
  }

}

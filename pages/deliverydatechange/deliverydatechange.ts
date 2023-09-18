import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-deliverydatechange',
  templateUrl: 'deliverydatechange.html',
})
export class DeliverydatechangePage {
enddate: string = new Date().toISOString();
projectdata:any;
order_num:any;
orderhdr:any;
orderdtl:any;
itemnum:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) {
  this.order_num=this.navParams.get('order_num');
  this.itemnum=this.navParams.get('itemnum');
  }

dismiss() 
   {
     this.viewCtrl.dismiss();
   }

gotoNetScreen()
{
		if(this.enddate=='' || this.enddate==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select Delivery date',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();

	    }
	    else
	    {	
			this.storage.get('userid').then((userid) => {
		        this.api.post('completetheDateWork',{userid:userid, order_num:this.order_num,deliverydate:this.enddate,itemnum:this.itemnum}).subscribe((res:any) => {
		                if(res.status=='success')
		                {
		                    let toast = this.toastCtrl.create({
		                        message: 'Delivery date updated successfully',
		                        duration: 3000,
		                        position: 'bottom'
		                    });
		                    toast.present();

		                    this.storage.get('userid').then((userid) => {
		                      this.api.post('getvieworderdetails',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
		                          this.orderhdr=res.orderhdr;
		                          this.orderdtl=res.orderdtl;
		                          this.projectdata=[this.orderhdr,this.orderdtl];
		                          this.viewCtrl.dismiss(this.projectdata);
		                      });
		                    });
		                }
		        });
		      });	  
		}
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliverydatechangePage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-addnewline',
  templateUrl: 'addnewline.html',
})
export class AddnewlinePage {
order_num:any;
itemname:any;
qty:any;
discount:any;
invoice:any;
orderhdrdtl:any;
directdata:any;
service:any;
itemprice:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) {
  this.order_num=this.navParams.get('order_num');
  }

   dismiss() 
   {
     this.viewCtrl.dismiss();
   }

   addNewOrder()
   {
   		//this.storage.get('userid').then((userid) => {
	

	
	if(this.itemname=='' || this.itemname==undefined)
	{
			let toast = this.toastCtrl.create({
					            message: 'Enter Item Name..',
					            duration: 3000,
					            position: 'bottom'
					        });
							
		alert('Enter item Name');	
	}
	else if(this.service=='' || this.service==undefined)	
	{
			let toast = this.toastCtrl.create({
					            message: 'Select Service Type...',
					            duration: 3000,
					            position: 'bottom'
					        });
			alert('Select Service Type...');					
	}
	else if(this.itemprice=='' || this.itemprice==undefined)	
	{
		let toast = this.toastCtrl.create({
							message: 'Enter Total Item Price..',
							duration: 3000,
							position: 'bottom'
						});
		alert('Enter Total Item Price..');				
	}					
	else if(this.qty=='' || this.qty==undefined || this.qty=='0')	
	{		
	let toast = this.toastCtrl.create({
						message: 'Enter Total Item Qty..',
						duration: 3000,
						position: 'bottom'
					});					
		alert('Enter Total Item Qty..');
	}
	else 
	{
		let loading = this.loadingCtrl.create({
		spinner:'hide',
		content: '<img src="assets/img/busy.gif">',
		});
		loading.present();
		
	  		this.api.post('donewOrder',{userid:localStorage.getItem('userid'), order_num:this.order_num,itemname:this.itemname, qty:this.qty, discount:this.discount, service:this.service,itemprice:this.itemprice}).subscribe((res:any) => {
	  				if(res.status=='success')
	  				{
		loading.dismiss(); 
	  						let toast = this.toastCtrl.create({
					            message: 'New line added Successfully',
					            duration: 3000,
					            position: 'bottom'
					        });
					        toast.present();
					        //this.storage.get('userid').then((userid) => {
						  		//this.api.post('getproviderinvoice',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
								//		this.invoice=res.invoice;
						  		//		this.orderhdrdtl=res.orderhdrdtl;
						  		//		this.directdata=[this.invoice,this.orderhdrdtl];
						  		//		this.viewCtrl.dismiss(this.directdata);
										
										//------biplab phase3 0913 ------------------------
								this.api.post('getproviderinvoicelatest',{userid:localStorage.getItem('userid'), order_num:this.order_num}).subscribe((res:any) => {
						  				this.invoice=res.invoice;
						  				this.orderhdrdtl=res.orderhdrdtl;
						  				this.directdata=[this.invoice,this.orderhdrdtl];
						  				this.viewCtrl.dismiss(this.directdata);
										
										//------------------------------
						  		});
						  	//});
	  				}
					else  // duplicate item
					{
							loading.dismiss();
							
							  	let toast = this.toastCtrl.create({
					            message: 'This item already exist..you can not add again',
					            duration: 5000,
					            position: 'bottom'
					        });
					        toast.present();
							
						
					}
	  				
	  		});
	} // 
	  //	});
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddnewlinePage');
  }

}

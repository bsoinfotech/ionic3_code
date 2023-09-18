import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-modifyline',
  templateUrl: 'modifyline.html',
})
export class ModifylinePage {
order_num:any;
itemname:any;
itemprice:any;
service:any;
qty:any;
discount:any;
invoice:any;
orderhdrdtl:any;
directdata:any;
item_number:any;
edit_item:any;


  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) {
	this.order_num=this.navParams.get('order_num');
	this.itemname=this.navParams.get('itemname');
	this.itemprice=this.navParams.get('itemprice');
	this.service=this.navParams.get('service');
	this.item_number=this.navParams.get('item_number');
  
						
  
  		this.storage.get('userid').then((userid) => {
	  		this.api.post('getjobOrderdetails',{userid:userid, order_num:this.order_num,itemname:this.itemname,item_number:this.item_number}).subscribe((res:any) => {
	  				this.qty=res.qty;
	  				this.discount=res.discount;	
					this.edit_item=	res.edit_item;
					});
					
		//let toast = this.toastCtrl.create({ 
		//message: 'edit_item='+this.edit_item,
		//duration: 3000,
		//position: 'bottom'
		//});
		//toast.present();
			
					
					
	  	});


 
  //this.qty=this.navParams.get('qty');
  //this.discount=this.navParams.get('discount');
  }

  editOrder()
  {

  		this.storage.get('userid').then((userid) => {
	  		this.api.post('doeditOrder',{userid:userid, order_num:this.order_num,itemname:this.itemname, qty:this.qty, discount:this.discount, itemprice:this.itemprice,item_number:this.item_number}).subscribe((res:any) => {
	  				if(res.status=='success')
	  				{
	  						let toast = this.toastCtrl.create({
					            message: 'Successfully Updated',
					            duration: 3000,
					            position: 'bottom'
					        });
					        toast.present();
					        this.storage.get('userid').then((userid) => {
						  		this.api.post('getproviderinvoicelatest',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
						  				this.invoice=res.invoice;
						  				this.orderhdrdtl=res.orderhdrdtl;
						  				this.directdata=[this.invoice,this.orderhdrdtl];
						  				this.viewCtrl.dismiss(this.directdata);
						  		});
						  	});
	  				}
	  				
	  		});
	  	});

  }

  dismiss() 
   {
     this.viewCtrl.dismiss();
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifylinePage');
  }

}

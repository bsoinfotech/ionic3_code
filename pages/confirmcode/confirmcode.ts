import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-confirmcode',
  templateUrl: 'confirmcode.html',
})
export class ConfirmcodePage {
order_num:any;
directdata:any;
viewproject:any;
viewprojectstatus:any;
random:any;
todayjobs:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) {
  this.order_num=this.navParams.get('order_num');
  
 // alert('order_num='+this.order_num);
  }

    dismiss() 
   {
     this.viewCtrl.dismiss();
   }
   addNewOrder()
   {
   			if(this.random=='' || this.random==undefined)
			{
					let toast = this.toastCtrl.create({
					            message: 'Enter Job Code to start the job',
					            duration: 3000,
					            position: 'bottom'
					        });
					        toast.present();
			}
			else
			{
   		this.storage.get('userid').then((userid) => {
			
		//alert('ordernum='+this.order_num+' random='+this.random+'  user='+userid);	
	  		this.api.post('custAcceptcode',{userid:userid, order_num:this.order_num,random:this.random}).subscribe((res:any) => {
	  				if(res.status=='success')
	  				{
	  						let toast = this.toastCtrl.create({
					            message: 'Customer code accepted successfully',
					            duration: 3000,
					            position: 'bottom'
					        });
					        toast.present();


					        this.storage.get('userid').then((userid) => {
							  		this.api.post('getproviderprojectdetails',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
							  			
							  				this.viewproject=res.viewproject;
							  				this.viewprojectstatus=res.viewprojectstatus;
								  				this.directdata=[this.viewproject,this.viewprojectstatus];
				  								this.viewCtrl.dismiss(this.directdata);
							  		});
						  	  	});


	  				}
	  				else
	  				{
	  						let toast = this.toastCtrl.create({
					            message: 'Invalid customer code',
					            duration: 3000,
					            position: 'bottom'
					        });
					        toast.present();
							/*
					        this.storage.get('userid').then((userid) => {
							  		this.api.post('getproviderprojectdetails',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
							  			
							  				this.viewproject=res.viewproject;
							  				this.viewprojectstatus=res.viewprojectstatus;

							  			this.directdata=[this.viewproject,this.viewprojectstatus];
						  				this.viewCtrl.dismiss(this.directdata);
							  			
							  		});
						  	  	});
							*/
	  				}
	  				
	  		});
	  	});
	  	}
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmcodePage');
  }

}

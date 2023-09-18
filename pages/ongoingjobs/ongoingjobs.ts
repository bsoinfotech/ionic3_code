import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 

import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-ongoingjobs',
  templateUrl: 'ongoingjobs.html',
})
export class OngoingjobsPage {
ongoingjobs:any;
nval:any;
//public user: User,public general: General, public api: Api,
  constructor(public user: User,public general: General, public api: Api,
  public navParams: NavParams, 
  public navCtrl: NavController, private storage: Storage, 
  private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) 
  {
	  /*this.storage.get('userid').then((userid) => {
	  		this.api.post('getongoingjobs',{userid:userid}).subscribe((res:any) => {
	  			if(res.status=='success')
	  			{
	  				this.nval=true;
	  				this.ongoingjobs=res.ongoingjobs;
	  			}
	  			else
	  			{
	  				this.nval=false;
	  				this.ongoingjobs=res.ongoingjobs;
	  			}
	  			
	  		});
  	  });
	  */
  }

  goJobhistory()
  {
	  
	  		let loading =  this.loadingCtrl.create({
			spinner:'hide',
			content: '<img src="assets/img/busy.gif">',
			dismissOnPageChange: true 
			//content: 'Loading Please Wait...'
			});
			loading.present();
  	this.navCtrl.setRoot('JobhistoryPage');
			loading.dismiss();
  }

   cancelJob(ordernum)
  {

  		let alert = this.alertCtrl.create({
    title: '',
    message: 'Do you want to cancel this job?',
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
          this.storage.get('userid').then((userid) => {
          this.api.post("canceljob", { ordernum:ordernum, userid:userid}).subscribe((resp:any) => {
  loading.dismiss();
          	if(resp.status=='success')
          	{
                let toast = this.toastCtrl.create({
	                  message: 'Job Cancelled Successfully',
	                  duration: 3000,
	                  position: 'bottom'
	              });
	              toast.present();
	              this.storage.get('userid').then((userid) => {
				  		this.api.post('getongoingjobs',{userid:userid}).subscribe((res:any) => {
				  			if(res.status=='success')
				  			{
				  				this.nval=true;
				  				this.ongoingjobs=res.ongoingjobs;
				  			}
				  			else
				  			{
				  				this.nval=false;
				  				this.ongoingjobs=res.ongoingjobs;
				  			}
				  			
				  		});
			  	  });
	             
          	}
            });
            });
        }
      }
    ]
  });
  alert.present();
  }

viewProject(order_num,spid,catid)
{
	/*
		let loading =  this.loadingCtrl.create({
		spinner:'hide',
		content: '<img src="assets/img/busy.gif">',
		dismissOnPageChange: true 
		//content: 'Loading Please Wait...'
		});
		loading.present();
	*/
			
	this.navCtrl.push('ViewprojectPage', {order_num:order_num,spid:spid,catid:catid});
	
		//loading.dismiss();
	
}

goNextpage(page)
{
	/*
		let loading =  this.loadingCtrl.create({
		spinner:'hide',
		content: '<img src="assets/img/busy.gif">',
		dismissOnPageChange: true 
		//content: 'Loading Please Wait...'
		});
		loading.present();
		
    
	
		loading.dismiss();
		
	*/
	this.navCtrl.setRoot(page);
}

gotoBack()
  {

	  this.navCtrl.setRoot('JobPage');
  }
  

goNextpage1(page)
{
		/*
			let loading =  this.loadingCtrl.create({
		spinner:'hide',
		content: '<img src="assets/img/busy.gif">',
		dismissOnPageChange: true 
		//content: 'Loading Please Wait...'
		});
		loading.present();
		*/
		
    this.navCtrl.push(page);
	
	//	loading.dismiss();
}

//ionViewWillEnter() {

ionViewDidLoad() {
	    
 //  this.general.showLoading();
		
	  	  	let loading =  this.loadingCtrl.create({
			spinner:'hide',
			content: '<img src="assets/img/busy.gif">',
			//duration: 3000
			});
			loading.present();
		
			
	  	  this.storage.get('userid').then((userid) => {
	  		this.api.post('getongoingjobs',{userid:userid}).subscribe((resp:any) => {
	//alert('status='+resp.status)				
			loading.dismiss();
	  			if(resp.status=='success')
	  			{
	  				this.nval=true;
	  				this.ongoingjobs=resp.ongoingjobs;
					//loading.dismiss();
					
					//alert('hahahhha');
	  			}
	  			else
	  			{
	  				this.nval=false;
	  				this.ongoingjobs=resp.ongoingjobs;
					//loading.dismiss();
	  			}
	  			
	  		});
  	  });
   //console.log('ionViewDidLoad OngoingjobsPage');
  }

}



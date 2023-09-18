import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController,ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-agentreviewrating',
  templateUrl: 'agentreviewrating.html',
})
export class AgentreviewratingPage {

qualityofwork:any;
ontimereporting:any;
	order_num:any;
	remark:any;
	ratingdata:any;
	ratingdata1:any;
	spid:any;
	catid:any;
	userid:any;


  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) {
	  this.order_num=this.navParams.get('order_num');
	  this.spid=this.navParams.get('spid');
	  this.catid=this.navParams.get('catid');
	  this.userid=localStorage.getItem('userid');
	  
	  this.api.post('getagentreviewrating',{ catid:this.catid, order_num:this.order_num}).subscribe((resp : any) => {
	  		this.ratingdata=resp.ratingdata;
	  		this.ratingdata1=resp.ratingdata1;
	  		this.ontimereporting=resp.ontimereporting;
	  		this.qualityofwork=resp.qualityofwork;
	  		this.remark=resp.remark;
	  });

	 /* this.api.post('getratingstatus',{ order_num:this.order_num}).subscribe((resp : any) => {
	 		this.ratingdata=resp.ratingdata;
	 		alert(JSON.stringify(this.ratingdata));	
	  });*/
  }

  dismiss()
  {
    this.viewCtrl.dismiss();
  }
    submit(first,second)
	{	
		if(this.ontimereporting=='' || this.ontimereporting==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select On Time Reporting',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();
	    }
	    else if(this.qualityofwork=='' || this.qualityofwork==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select Quality of work',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();
	    }
	    else if(this.remark=='' || this.remark==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select Review',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();
	    }
		else
		{	
		//this.storage.get('userid').then((userid) => {
		 let loading = this.loadingCtrl.create({ spinner: 'hide',
                  content: '<img src="assets/img/busy.gif">',
              });
              loading.present();
			this.api.post('saveagentReview',{ userid:this.userid, order_num:this.order_num, remark:this.remark, qualityofwork:this.qualityofwork, ontimereporting:this.ontimereporting, agentid:this.spid,first:first,second:second}).subscribe((resp : any) => {
			loading.dismiss();
				if(resp.status=='success')
				{
					let toast = this.toastCtrl.create({
			            message: 'Rating and Review Added Successfully',
			            duration: 3000,
			            position: 'bottom'
		          	});
		          	toast.present();
		          			this.navCtrl.push('OngoingjobsPage',{userid:this.userid});
		          			this.api.post('getagentreviewrating',{ catid:this.catid, order_num:this.order_num}).subscribe((resp : any) => {
										  		this.ratingdata=resp.ratingdata;
										  		this.ratingdata1=resp.ratingdata1;
										  		this.ontimereporting=resp.ontimereporting;
										  		this.qualityofwork=resp.qualityofwork;
										  		this.remark=resp.remark;
										  });
				}

				if(resp.status=='success1')
				{
					let toast = this.toastCtrl.create({
			            message: 'Rating and Review Added Successfully',
			            duration: 3000,
			            position: 'bottom'
		          	});
		          	toast.present();
		          			this.navCtrl.push('JobhistoryPage',{userid:this.userid});
				}
        	});	
		//});
	  }
	}


  ionViewDidLoad() {
    console.log('ionViewDidLoad AgentreviewratingPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController,ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-agenceyreview',
  templateUrl: 'agenceyreview.html',
})
export class AgenceyreviewPage {
problem:any;
pro_attitude:any;
qualityofwork:any;
ontimereporting:any;
	order_num:any;
	remark:any;
	ratingdata:any;
	ratingdata1:any;
	ratingdata2:any;
	ratingdata3:any;
	spid:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) {
  this.order_num=this.navParams.get('order_num');
  this.spid=this.navParams.get('spid');
  
 // alert('hello:'+this.order_num);
  
  this.api.post('getreviewrating',{ order_num:this.order_num}).subscribe((resp : any) => {
  		this.ratingdata=resp.ratingdata;
		
// alert('gello: '+resp.ratingdata);
 
  		this.ratingdata1=resp.ratingdata1;
  		this.ratingdata2=resp.ratingdata2;
  		this.ratingdata3=resp.ratingdata3;

  		this.ontimereporting=resp.ontimereporting;
  		this.qualityofwork=resp.qualityofwork;
  		this.pro_attitude=resp.pro_attitude;
  		this.problem=resp.problem;
  		this.remark=resp.remark;
  });
  }

  dismiss()
  {
    this.viewCtrl.dismiss();
  }

     submit(first,second,third,fourth,spid)
	{	
	
//	alert('gello: '+first+' second:'+second);

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
	    else if(this.pro_attitude=='' || this.pro_attitude==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select Service provider attitude',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();

	    }
	    else if(this.problem=='' || this.problem==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select Problem explained well',
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
		// let loading = this.loadingCtrl.create({ spinner: 'hide',
         //         content: '<img src="assets/img/busy.gif">',
          //    });
          //    loading.present();

			this.api.post('saveagent_Review',{ userid:localStorage.getItem('userid'),order_num:this.order_num,remark:this.remark,problem: this.problem, pro_attitude:this.pro_attitude, qualityofwork:this.qualityofwork,ontimereporting:this.ontimereporting,spid:spid,first:first,second:second,third:third,fourth:fourth}).subscribe((resp : any) => {
			//loading.dismiss();
				if(resp.status=='success')
				{
					let toast = this.toastCtrl.create({
			            message: 'Rating and Review Added Successfully',
			            duration: 3000,
			            position: 'bottom'
		          	});
		          	toast.present();
		          this.navCtrl.push('OngoingjobsPage');
		          		this.api.post('getreviewrating',{ order_num:this.order_num}).subscribe((resp : any) => {
					  		this.ratingdata=resp.ratingdata;
					  		this.ratingdata1=resp.ratingdata1;
					  		this.ratingdata2=resp.ratingdata2;
					  		this.ratingdata3=resp.ratingdata3;

					  		this.ontimereporting=resp.ontimereporting;
					  		this.qualityofwork=resp.qualityofwork;
					  		this.pro_attitude=resp.pro_attitude;
					  		this.problem=resp.problem;
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
		          this.navCtrl.push('JobhistoryPage');

		          			 
				}
				
        	});	
		//});
		}
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgenceyreviewPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-pendingleads',
  templateUrl: 'pendingleads.html',
})
export class PendingleadsPage {

 nval:any;
orderdetails:any;
allleadcount:any;
userid:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
/*
	this.general.showLoading();
      this.storage.get('userid').then((userid) => {
          this.api.post('getpendingleadmanagement',{userid:userid}).subscribe((res:any) => {
            if(res.status=='success')
            {
              this.nval=true;
              this.orderdetails=res.orderdetails;
              this.allleadcount=res.allleadcount;
            }
            else
            {
              this.nval=false;
              this.orderdetails=res.orderdetails;
			   this.allleadcount=res.allleadcount;
            }
          });
        });
		this.general.hideLoading();
*/
this.userid=this.navParams.get('userid'); 
  }

  goHome()
  {
	  this.general.showLoading();
    this.navCtrl.setRoot('DashboardPage',{userid:this.userid});
	this.general.hideLoading();
  }

goviewLead(order_num,bid,pending)
  {
	  this.general.showLoading();
		if(bid=='Y')
		{
		  this.navCtrl.push('ViewleadPage', {userid:this.userid,order_num:order_num,pending:pending});
		}
		else
		{
		  this.navCtrl.push('ViewleadnobidPage', {userid:this.userid,order_num:order_num,pending:pending});
		}
    this.general.hideLoading();
  }

goleadsmangement()
  {
	  this.general.showLoading();
  this.navCtrl.setRoot('LeadmasmanagementPage',{userid:this.userid});
  this.general.hideLoading();
  
  }
  gonewLead()
  {		this.general.showLoading();
  		this.navCtrl.setRoot('NewleadsPage',{userid:this.userid});
		this.general.hideLoading();
  }
  gocancelLead()
  {
	  this.general.showLoading();
  	this.navCtrl.setRoot('CancelleadsPage',{userid:this.userid});
	this.general.hideLoading();
  }
 

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PendingleadsPage');
		this.general.showLoading();
    this.userid=this.navParams.get('userid'); 
     // this.storage.get('userid').then((userid) => {
          this.api.post('getpendingleadmanagement',{userid:this.userid}).subscribe((res:any) => {
            if(res.status=='success')
            {
              this.nval=true;
              this.orderdetails=res.orderdetails;
              this.allleadcount=res.allleadcount;
            }
            else
            {
              this.nval=false;
              this.orderdetails=res.orderdetails;
			   this.allleadcount=res.allleadcount;
            }
          });
       // });
		this.general.hideLoading();
  }

}

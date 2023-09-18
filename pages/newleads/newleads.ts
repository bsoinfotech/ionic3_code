import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController,ModalController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-newleads',
  templateUrl: 'newleads.html',
})
export class NewleadsPage {

  nval:any;
orderdetails:any;
allleadcount:any;
cust_lat:any;
cust_lng:any;
userid:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController) 
  {

    this.userid=this.navParams.get('userid');
/*
      this.storage.get('userid').then((userid) => {
          this.api.post('getnewleadmanagement',{userid:userid}).subscribe((res:any) => {
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
*/
  }

goviewLead(order_num,bid)
  {
	  this.general.showLoading();
    if(bid=='Y')
    {
      let contactModal = this.modalCtrl.create('ViewleadPage', {order_num:order_num,userid:this.userid});
                                                contactModal.onDidDismiss(data =>{ 
                                                this.orderdetails=data;
                                                });
                                                contactModal.present();
    }
    else
    {
      let contactModal = this.modalCtrl.create('ViewleadnobidPage', {order_num:order_num,userid:this.userid});
                                                contactModal.onDidDismiss(data =>{ 
                                                this.orderdetails=data;
                                                });
                                                contactModal.present();
    }
	this.general.hideLoading();

  }

  goHome()
  {
	  this.general.showLoading();
    this.navCtrl.setRoot('DashboardPage',{userid:this.userid});
	this.general.hideLoading();
  }
  
 goleadsmangement()
  {
	  this.general.showLoading();
  this.navCtrl.setRoot('LeadmasmanagementPage',{userid:this.userid});
  this.general.hideLoading();
  
  }
  gopendingLead()
  {
	  this.general.showLoading();
  	this.navCtrl.setRoot('PendingleadsPage',{userid:this.userid});
	this.general.hideLoading();
  }
  gocancelLead()
  {
	  this.general.showLoading();
  	this.navCtrl.setRoot('CancelleadsPage',{userid:this.userid});
	this.general.hideLoading();
  }
 
  openAnyPage(cust_lat,cust_lng)
{
//        this.iab.create(url);
		
	//let destination = latitude + ',' + longitude;
	//	let destination = this.cust_lat + ',' + this.cust_lng;
		let destination = cust_lat + ',' + cust_lng;
	alert('Opening Google Map App');
		//if(this.platform.is('ios')){
		//	window.open('maps://?q=' + destination, '_system');
		//} else {
			
			let label = encodeURI('Customer Location');
			window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system','location=yes');
			

}
  ionViewDidLoad() {
    //console.log('ionViewDidLoad NewleadsPage');
	this.general.showLoading();
  this.userid=this.navParams.get('userid'); 
	     // this.storage.get('userid').then((userid) => {
          this.api.post('getnewleadmanagement',{userid:this.userid}).subscribe((res:any) => {
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
      //  });
		this.general.hideLoading();
  }

}

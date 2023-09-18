import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-cancelleads',
  templateUrl: 'cancelleads.html',
})
export class CancelleadsPage {

   nval:any;
orderdetails:any;
allleadcount:any;
userid:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

     // this.storage.get('userid').then((userid) => {
      this.userid=this.navParams.get('userid'); 
          this.api.post('getcancelleadmanagement',{userid:this.userid}).subscribe((res:any) => {
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
  }
  goHome()
  {
    this.navCtrl.setRoot('DashboardPage',{userid:this.userid});
  }

goviewLead(order_num)
  {
    this.navCtrl.push('ViewleadPage', {userid:this.userid,order_num:order_num});
  }

  goleadsmangement()
  {
  this.navCtrl.setRoot('LeadmasmanagementPage',{userid:this.userid});
  
  }
  
  gonewLead()
  {
  		this.navCtrl.setRoot('NewleadsPage',{userid:this.userid});
  }
  gopendingLead()
  {
  	this.navCtrl.setRoot('PendingleadsPage',{userid:this.userid});
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelleadsPage');
    this.userid=this.navParams.get('userid'); 
  }

}

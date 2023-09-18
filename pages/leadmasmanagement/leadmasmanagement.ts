import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-leadmasmanagement',
  templateUrl: 'leadmasmanagement.html',
})
export class LeadmasmanagementPage {
nval:any;
orderdetails:any;
allleadcount:any;
userid:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) 
  {

    this.userid=this.navParams.get('userid'); 
     // this.storage.get('userid').then((userid) => {
          this.api.post('getleadmanagement',{userid:this.userid}).subscribe((res:any) => {
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
            }
          });
       // });
  }

goviewLead(order_num)
  {
    this.navCtrl.push('ViewleadPage', {order_num:order_num,userid:this.userid});
  }
  gonewLead()
  {
  		this.navCtrl.setRoot('NewleadsPage',{userid:this.userid});
  }
  gopendingLead()
  {
  	this.navCtrl.setRoot('PendingleadsPage',{userid:this.userid});
  }
  gocancelLead()
  {
    this.navCtrl.setRoot('CancelleadsPage',{userid:this.userid});
  }
  
  ionViewDidLoad() {
    this.userid=this.navParams.get('userid'); 
    console.log('ionViewDidLoad LeadmasmanagementPage');
  }

}

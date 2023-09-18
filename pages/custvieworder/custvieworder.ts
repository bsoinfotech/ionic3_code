import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
//import { CallNumber } from '@ionic-native/call-number';, private callNumber: CallNumber

@IonicPage()
@Component({
  selector: 'page-custvieworder',
  templateUrl: 'custvieworder.html',
})
export class CustvieworderPage {
order_num:any;

orderhdr:any;
orderdtl:any;
viewprojectstatus:any;
spid:any;
jobstatus:any;
userid:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
this.order_num=this.navParams.get('order_num');
this.spid=this.navParams.get('spid');
this.jobstatus=this.navParams.get('jobstatus');
this.userid=localStorage.getItem('userid');

if(this.jobstatus=='50')
{
      this.viewprojectstatus=this.navParams.get('viewprojectstatus');
           // this.storage.get('userid').then((userid) => {
            this.api.post('getviewcustorderdetails1',{userid:this.userid,spid:this.spid, order_num:this.order_num}).subscribe((res:any) => {
                this.orderhdr=res.orderhdr;
                this.orderdtl=res.orderdtl;
            });
          //});
}
else
{
  this.viewprojectstatus=this.navParams.get('viewprojectstatus');
       // this.storage.get('userid').then((userid) => {
        this.api.post('getviewcustorderdetails',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
            this.orderhdr=res.orderhdr;
            this.orderdtl=res.orderdtl;
        });
      //});
  }
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad CustvieworderPage');
  }

}

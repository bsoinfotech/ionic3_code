import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
bankname:any;
bankactname:any;
ifsccode:any;
pan_id:any;
accountnumber:any;
attb_id:any;
userid:any;

  constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,public api: Api,public navParams: NavParams, public toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController) {
    this.attb_id=this.navParams.get('attb_id');
    this.userid=localStorage.getItem('userid');

      //this.storage.get('userid').then((userid) => {
            this.api.post("getproviderbankdetails", { userid:this.userid}).subscribe((resp:any) => {
                this.bankname=resp.userbankdetails.bankname;
                this.bankactname=resp.userbankdetails.bankactname;
                this.ifsccode=resp.userbankdetails.ifsccode;
                this.pan_id=resp.userbankdetails.pan_id;
                this.accountnumber=resp.userbankdetails.accountnumber;
            });
          //});
  	   
  }

  saveBankdetails(attb_id)
  {
       let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();
          //this.storage.get('userid').then((userid) => {
          this.api.post("saveBankDetailsletest", {userid:this.userid, pan_id:this.pan_id, ifsccode:this.ifsccode, accountnumber:this.accountnumber, bankactname:this.bankactname, bankname:this.bankname, attb_id:attb_id}).subscribe((resp:any) => {
          loading.dismiss();
             if(resp.status=='success')
             {
              let toast = this.toastCtrl.create({
                  message: 'Bank Details succefully Updated',
                  duration: 3000,
                  position: 'bottom'
              });
              toast.present();
              this.navCtrl.setRoot('ProfileStatusPage',{userid:this.userid});
             }
           });
         //});

  }

  skip()
  {
    this.navCtrl.setRoot('ProfileStatusPage',{userid:this.userid});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}

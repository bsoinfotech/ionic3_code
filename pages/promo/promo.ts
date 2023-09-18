import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-promo',
  templateUrl: 'promo.html',
})
export class PromoPage {
video:any;
promo_code:any;
promo_amt:any;


promohdr:any;
promodtl:any;
wlist:any;

wflow:any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public general: General,public api: Api,public user: User, private storage: Storage,public viewCtrl: ViewController) {

            this.promo_code=this.navParams.get('promo_code');
            this.promo_amt=this.navParams.get('promo_amt');


            this.api.post("getcoupondetail", {promo_code:this.promo_code }).subscribe((resp:any) => {
              this.promohdr=resp.promohdr;
              this.promodtl=resp.promodtl;
              this.wlist=resp.wlist;
              this.wflow =resp.wflow;
            });
  }

  createProfile()
  {
  this.navCtrl.setRoot('JobPage');
  //this.navCtrl.setRoot('DashboardPage');
  }

  dismiss()
  {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PromoPage');
  }




}

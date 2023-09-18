import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
balanceamount:any;
clearence:any;
walletamount:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public general: General,public api: Api,public user: User, private storage: Storage) {
  			this.storage.get('userid').then(userid=>{
		        this.api.post('getwallet',{userid:userid}).subscribe((res:any) => {
		                  this.balanceamount=res.balanceamount;
		                  this.clearence=res.clearence;
		                  this.walletamount=res.walletamount;
		        });
		      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }
goNextpage(page)
{
    this.navCtrl.setRoot(page);
}
}

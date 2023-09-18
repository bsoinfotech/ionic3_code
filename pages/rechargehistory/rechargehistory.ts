import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({  
  selector: 'page-rechargehistory',           
  templateUrl: 'rechargehistory.html',
})
export class RechargehistoryPage { 

  rechargehistory:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  		this.storage.get('userid').then((userid) => {
	  		this.api.post('getrechargehistory',{userid:userid}).subscribe((res:any) => {
	  				this.rechargehistory=res.rechargehistory;
	  		});
	  	});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargehistoryPage');
  }

}

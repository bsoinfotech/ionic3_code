import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-expenseshistory',
  templateUrl: 'expenseshistory.html',
})
export class ExpenseshistoryPage {
expenseshistory:any;
nval:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  		//this.storage.get('userid').then((userid) => {
	  		this.api.post('getexpenseshistory',{userid:localStorage.getItem('userid')}).subscribe((res:any) => {
          if(res.status=='success')
          {
	  				this.expenseshistory=res.expenseshistory;
          }
          else
          {
            this.nval=false;
          }
	  		});
	  	//});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseshistoryPage');
  }

}

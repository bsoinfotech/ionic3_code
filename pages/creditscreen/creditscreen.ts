import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-creditscreen',
  templateUrl: 'creditscreen.html',
})
export class CreditscreenPage {

  nval:any;
purchagedscreen:any;
images:any;
package:any;
currentpackage:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  		//this.storage.get('userid').then((userid) => {
	  		this.api.post('creditpurchasescreen',{userid:localStorage.getItem('userid')}).subscribe((res:any) => {
	  			if(res.status=='success')
	  			{
	  				this.nval=true;
	  				this.purchagedscreen=res.purchagedscreen;
	  				this.images=res.images;
            this.currentpackage=res.currentpackage;
	  			}
	  			else
	  			{
	  				this.nval=false;
	  				this.purchagedscreen=res.purchagedscreen;
	  			}
	  			
	  		});
  	  //});
  }

  goNextpage()
  {
  	if(this.package=='' || this.package==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Select Package',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }
    else
    {
    	this.navCtrl.push('PaymentpurchagescreenPage',{package:this.package});
    }
	
  }

  goExpenses()
  {
    this.navCtrl.push('ExpenseshistoryPage');
  }

  goRecharge()
  {
    this.navCtrl.push('RechargehistoryPage');
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditscreenPage');
  }

}

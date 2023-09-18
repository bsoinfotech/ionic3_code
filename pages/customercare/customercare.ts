import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-customercare',
  templateUrl: 'customercare.html',
})
export class CustomercarePage {
ccnumber:any;
ref1:any;
whatsappno:any;


  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// biplab phase2 start 0824
        //this.storage.get('userid').then((userid) => {
          this.api.post('get_ccnumber',{userid:localStorage.getItem('userid')}).subscribe((res2:any) => {
                  this.ccnumber=res2.ccnumber;
				  //this.ccnumber=res.Ref1;
				  this.ref1=res2.ref1;
				  this.whatsappno=res2.whatsappno;
          });
        //});
		// end
  
  }
   dismiss() 
   {
     this.viewCtrl.dismiss();
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomercarePage');
  }

}

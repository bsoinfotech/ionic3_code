import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-teamscreen4',
  templateUrl: 'teamscreen4.html',
})
export class Teamscreen4Page {
details:any;
nval:any;
detailshdr:any;
value:any;
spid:any;
//user_id:any;
ongoingjob:any;
user_type:any;
id:any;


  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, 
  private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  this.value=this.navParams.get('value');
  this.spid=this.navParams.get('spid');
  this.ongoingjob=this.navParams.get('ongoingjob');
  this.user_type=this.navParams.get('user_type');
//  this.user_id=this.spid;
				/*
  	                  let toast = this.toastCtrl.create({
                      message: 'teamscreen4.ts->spid='+this.spid,
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
				*/
  
  			this.storage.get('userid').then((userid) => {
		  		this.api.post('getscreen4data',{userid:userid,spid:this.spid,ongoingjob:this.ongoingjob,user_type:this.user_type}).subscribe((res:any) => {
			          if(res.status=='success')
			          {
				  		this.details=res.details;
				  		//this.detailshdr=res.detailshdr;
						
			          }
			          else
			          {
			            this.nval=false;
			          }
		  		});
		  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Teamscreen4Page');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-teamscreen3',
  templateUrl: 'teamscreen3.html',
})
export class Teamscreen3Page {
out3details:any;
nval:any;
pag:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  	this.pag=this.navParams.get('pag');
  	if(this.pag=='out3')
  	{
  			this.storage.get('userid').then((userid) => {
		  		this.api.post('getout3data',{userid:userid}).subscribe((res:any) => {
		          if(res.status=='success')
		          {
			  				this.out3details=res.out3details;
		          }
		          else
		          {
		            this.nval=false;
		          }
		  		});
		  	});
  	}
  	else 
  	{
  			this.storage.get('userid').then((userid) => {
		  		this.api.post('getout4data',{userid:userid}).subscribe((res:any) => {
		          if(res.status=='success')
		          {
			  				this.out3details=res.out3details;
		          }
		          else
		          {
		            this.nval=false;
		          }
		  		});
		  	});
  	}
  		
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Teamscreen3Page');
  }

}

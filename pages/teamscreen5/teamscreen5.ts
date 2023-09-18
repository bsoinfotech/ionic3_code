import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-teamscreen5',
  templateUrl: 'teamscreen5.html',
})
export class Teamscreen5Page {

out5details:any;
nval:any;
pag:any;
user_type:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  this.pag=this.navParams.get('pag');
	if(this.pag=='out5')
  	{
		this.user_type='out5';
  		this.storage.get('userid').then((userid) => {
	  		this.api.post('getout5data',{userid:userid}).subscribe((res:any) => {
		          if(res.status=='success')
		          {
			  		this.out5details=res.out5details;
		          }
		          else
		          {
		            this.nval=false;
		          }
	  		});
	  	});
	 }
	 
	if(this.pag=='comp')
  	{
		this.user_type='comp';
  		this.storage.get('userid').then((userid) => {
	  		this.api.post('getout5datacomp',{userid:userid}).subscribe((res:any) => {
		          if(res.status=='success')
		          {
			  		this.out5details=res.out5details;
		          }
		          else
		          {
		            this.nval=false;
		          }
	  		});
	  	});
	 }
	 
	if(this.pag=='pend')
  	{
		this.user_type='pend';
  		this.storage.get('userid').then((userid) => {
	  		this.api.post('getout5datapend',{userid:userid}).subscribe((res:any) => {
		          if(res.status=='success')
		          {
			  		this.out5details=res.out5details;
		          }
		          else
		          {
		            this.nval=false;
		          }
	  		});
	  	});
	 }
	 
	 
	 if(this.pag=='out6')
	 {
			this.user_type='out6';
	 		this.storage.get('userid').then((userid) => {
	  		this.api.post('getout6data',{userid:userid}).subscribe((res:any) => {
		          if(res.status=='success')
		          {
			  				this.out5details=res.out6details;
		          }
		          else
		          {
		            this.nval=false;
		          }
	  		});
	  	});
	 }
  }

  goScreen4(value,spid,ongoingjob,user_type)
  {
	               /*   let toast = this.toastCtrl.create({
                      message: 'spid='+spid,
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
				  */
  	this.navCtrl.push('Teamscreen4Page',{value:value,spid:spid,ongoingjob:ongoingjob,user_type:user_type});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Teamscreen5Page');
  }

}

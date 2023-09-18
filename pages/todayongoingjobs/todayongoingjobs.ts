import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ModalController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-todayongoingjobs',
  templateUrl: 'todayongoingjobs.html',
})
export class TodayongoingjobsPage {
todayjobs:any;
	nval:any;
	userid:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController) 
  {

	this.userid=this.navParams.get('userid'); 
    /*
	  this.storage.get('userid').then((userid) => {
	  		this.api.post('todayjobworkflowmangment',{userid:userid}).subscribe((res:any) => {
	  			if(res.status=='success')
	  			{
	  				this.nval=true;
	  				this.todayjobs=res.todayjobs;
	  			}
	  			else
	  			{
	  				this.nval=false;
	  				this.todayjobs=res.todayjobs;
	  			}  			
	  		});
  	  });
	*/
  }

  goHome()
  {
	//this.general.showLoading();

	//alert('gohome='+this.userid);
    this.navCtrl.setRoot('DashboardPage',{userid:this.userid});
	//this.general.hideLoading();
  }

  goacceptedPage()
  {		
		this.general.showLoading();
  		this.navCtrl.setRoot('JobplanningPage',{userid:this.userid});
		this.general.hideLoading();
  }
  gotomorrowPage()
  {
	   this.general.showLoading();
	  // alert('gotomorrowPage='+this.userid);
  		this.navCtrl.setRoot('TomorrowongoingjobsPage',{userid:this.userid});
		this.general.hideLoading();
  }
  gocancelPage()
  {
		this.general.showLoading();
  		this.navCtrl.setRoot('CancelongoingjobsPage',{userid:this.userid});
		this.general.hideLoading();
  }

  goviewproject(order_num,cust_id){
this.general.showLoading();
  let contactModal = this.modalCtrl.create('ProviderViewprojectPage', {userid:this.userid,order_num:order_num,cust_id:cust_id});
        contactModal.onDidDismiss(data =>{ 
            this.todayjobs=data;
        });
        contactModal.present();
this.general.hideLoading();
  }



  ionViewDidLoad() {
   // console.log('ionViewDidLoad TodayongoingjobsPage');
   this.general.showLoading();
   this.userid=this.navParams.get('userid'); 
   	//  this.storage.get('userid').then((userid) => {
	  		this.api.post('todayjobworkflowmangment',{userid:this.userid}).subscribe((res:any) => {
	  			if(res.status=='success')
	  			{
	  				this.nval=true;
	  				this.todayjobs=res.todayjobs;
	  			}
	  			else
	  			{
	  				this.nval=false;
	  				this.todayjobs=res.todayjobs;
	  			} 
				this.general.hideLoading();
	  		});
  	  //});
  }
  refresh_screen()
  {
	  this.navCtrl.setRoot('DashboardPage',{userid:this.userid});
  }
}

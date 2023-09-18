import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-partsdtl',
  templateUrl: 'partsdtl.html',
})
export class PartsdtlPage {
	
userid:any;
catid:any;
viewparts:any;
usertype:any;
cat_name:any;
nval:any;



  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, 
  private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) 
  {
	//	this.order_num=this.navParams.get('order_num');
		this.userid=this.navParams.get('userid');
		this.catid=this.navParams.get('catid');

  }


  ionViewDidLoad() 
  {
	  
	  //alert('userid='+this.userid+' cat_id='+this.catid);
	  
		this.api.post('partsrate',{userid:this.userid,catid:this.catid}).subscribe((res:any) => 
		{
		this.nval=true;
		this.viewparts=res.viewparts;
  		});
			
		//alert('userid='+this.userid+' cat_id='+this.catid);	
		this.api.post('getusertype',{userid:this.userid,catid:this.catid}).subscribe((res:any) => 
		{
		this.usertype=res.usertype;
		this.cat_name=res.cat_name;
		
		//alert('type='+this.usertype+' cat_name='+this.cat_name);
		});
	  
	  
    console.log('ionViewDidLoad PartsdtlPage');
  }
  
  
 refresh_screen()
{
	
	if(this.usertype=='p')
	{
   // this.navCtrl.setRoot('DashboardPage');
	this.navCtrl.pop()
	}
	else
	{
		
		//this.navCtrl.push('Serviceandrepair2Page');
		//this.navCtrl.pop('Serviceandrepair2Page');
		this.navCtrl.pop()

	}
	
}

}

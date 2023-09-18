import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User,Api,General } from '../../providers';

/**
 * Generated class for the WrongversionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appsrating',
  templateUrl: 'appsrating.html',
})
export class AppsratingPage {

	status:any;
	sms2:any;
	sms3:any;
	link:any;
	version:any;
  order_num:any;

  constructor(public navCtrl: NavController, public api: Api,public navParams: NavParams,public viewCtrl: ViewController,private storage: Storage)
  {
	this.status=this.navParams.get('status');
	this.sms2=this.navParams.get('sms2');
	this.sms3=this.navParams.get('sms3');
	this.link=this.navParams.get('link');
  this.order_num=this.navParams.get('order_num');
  }
getUpdate(order_num,val1)
{

 // this.storage.get('userid').then(userid=>{
      this.api.post('saveapps_rating',{order_num:order_num,val1:val1}).subscribe((res:any) => {

      });
      this.viewCtrl.dismiss(0);
 // });

}

dismiss()
{
   //let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(0);
 }


  ionViewDidLoad()
  {
    console.log('ionViewDidLoad AppsratingPage');
  }

}

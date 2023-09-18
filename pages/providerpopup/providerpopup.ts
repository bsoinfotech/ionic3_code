import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the WrongversionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-providerpopup',
  templateUrl: 'providerpopup.html',
})
export class ProviderpopupPage {

	status:any;
	sms2:any;
	sms3:any;
	link:any;
	version:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private storage: Storage)
  {
	this.status=this.navParams.get('status');
	this.sms2=this.navParams.get('sms2');
	this.sms3=this.navParams.get('sms3');
	this.link=this.navParams.get('link');

  }
getUpdate()
{

}

dismiss()
{
   //let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(0);
 }


  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ProviderpopupPage');
  }

}

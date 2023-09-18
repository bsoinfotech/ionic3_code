import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {
utype:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.utype=this.navParams.get('utype');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');
  }
loginTapped()
{
  	this.navCtrl.push('LoginPage',{
  		utype:this.utype
  	}); 
}

registerTapped()
{
  	this.navCtrl.push('SignupPage',{
  		utype:this.utype
  	}); 
}
}

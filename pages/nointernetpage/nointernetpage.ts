import { Component } from '@angular/core';
import { Platform,IonicPage,NavParams, NavController, ViewController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-nointernetpage',
  templateUrl: 'nointernetpage.html',
})
export class NointernetpagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private network: Network, private platform: Platform) 
  {
  	platform.registerBackButtonAction(() => {
	  if(this.navCtrl.canGoBack()){
	  }
	});
  	let connectSubscription = this.network.onConnect().subscribe(() => {
        this.viewCtrl.dismiss();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NointernetpagePage');
  }

}

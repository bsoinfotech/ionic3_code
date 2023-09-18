import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
video:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public general: General,public api: Api,public user: User, private storage: Storage) {
            this.api.post("getvideos", { }).subscribe((resp:any) => {
              this.video=resp.video; 
            });
  }

  createProfile()
  {
  this.navCtrl.setRoot('ProfileStatusPage');
  //this.navCtrl.setRoot('DashboardPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

 

   
}

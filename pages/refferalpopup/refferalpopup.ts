import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-refferalpopup',
  templateUrl: 'refferalpopup.html',
})
export class RefferalpopupPage {
nocode:any;
refferalcode:any;
ncode:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController,
    private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) {
  }

  dismiss()
   {
     this.viewCtrl.dismiss();
   }

  goNext()
  {

  		    if(this.refferalcode==undefined || this.refferalcode=='')
            {
                let toast = this.toastCtrl.create({
                      message: 'Enter Invitation Code',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
            }
            else
            {
  				 this.storage.get('userid').then((userid) => {
  				 		this.storage.get('utype').then((utype) => {
		  				this.api.post('selectRefferal',{refferalcode:this.refferalcode, nocode:this.nocode,userid:userid}).subscribe((res:any) => {
                          if(res.status=='success')
                          {
                              //--------------------------------------------
                                if (res.showmsg==1)
                                {
                                  let alert = this.alertCtrl.create({
                                    title: ' '+res.msg+' ',
                                    message: 'Click Ok to Proceed',
                                    buttons: [
                                    {
                                      text: 'Cancel',
                                      role: 'cancel',
                                      handler: () => {
                                      console.log('Cancel clicked');
                                      }
                                    },
                                    {
                                      text: 'Ok',
                                      handler: () =>
                                      {

                                      this.api.post('saveinvitecode',{id:res.id,super_user_id:res.super_user_id,ref_field4:res.ref_field4,ref_field2:res.ref_field2,type:res.type}).subscribe((res1:any) => {
                                        if(res1.status=='success')
                                        {
                                            let toast = this.toastCtrl.create({
                                            message: 'Invitation code accepted',
                                            duration: 3000,
                                            position: 'bottom'
                                            });
                                            toast.present();

                                            if(utype=='c')
                                            {
                                               this.navCtrl.setRoot('JobPage');
                                            }
                                            else
                                            {
                                               //this.navCtrl.setRoot('PrimaryBusinessPage');
                                               this.navCtrl.push('DetailAddressPage');
                                            }


                                        }
                                        });

                                      }
                                    }

                                    ]
                                  });
                                  alert.present();
                                }
                                else
                                {
                                  let toast = this.toastCtrl.create({
                                  message: res.msg,
                                  duration: 8000,
                                  position: 'bottom'
                                  });
                                  toast.present();

                                this.api.post('saveinvitecode',{id:res.id,super_user_id:res.super_user_id,ref_field4:res.ref_field4,ref_field2:res.ref_field2,type:res.type}).subscribe((res1:any) => {
                                  if(res1.status=='success')
                                  {
                                      let toast = this.toastCtrl.create({
                                      message: 'Invitation code accepted',
                                      duration: 6000,
                                      position: 'bottom'
                                      });
                                      toast.present();
                                      if(utype=='c')
                                      {
                                         this.navCtrl.setRoot('JobPage');
                                      }
                                      else
                                      {
                                         //this.navCtrl.setRoot('PrimaryBusinessPage');
                                         this.navCtrl.push('DetailAddressPage');
                                      }

                                  }
                                  });

                                }
                                //-------------------------------------------

                          }
                          else
                          {
                            //invalid
                            let toast = this.toastCtrl.create({
                            message: 'Invalid Invitation code',
                            duration: 3000,
                            position: 'bottom'
                            });
                            toast.present();
                          }
                         });
                    });
                 });
            }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefferalpopupPage');
  }

}

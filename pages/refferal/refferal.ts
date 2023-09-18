import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ModalController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-refferal',
  templateUrl: 'refferal.html',
})
export class RefferalPage {
	refferalcode:any;
	nocode:any;
	ncode:any;
  refermsg:any;
  refermsg1:any;
  refermsg2:any;
  referimage:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController) {
  }


  goNext()
  {
  		if(this.nocode==true)
  		{
  				this.ncode='yes';
  		}
  		else
  		{
  				this.ncode='no';
  		}
  		if(this.refferalcode==undefined && this.ncode=='no')
            {
                let toast = this.toastCtrl.create({
                      message: 'Enter refferal code / Select no reference code',
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

                                      //  this.refermsg=res.refermsg;

		                                       let toast = this.toastCtrl.create({
		                                              message: 'Reference code activated success',
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
		                                             this.navCtrl.setRoot('PrimaryBusinessPage');
		                                          }
		                                  }
		                                 });
		                            });
                                 });




            }
  }

  gorefferalPopup()
  {
  		let contactModal = this.modalCtrl.create('RefferalpopupPage');
        contactModal.onDidDismiss(data =>{
        });
        contactModal.present();
  }

  gornextPopup()
  {
           this.storage.get('userid').then((userid) => {
              this.storage.get('utype').then((utype) => {
              this.api.post('selectRefferal',{refferalcode:'0',userid:userid}).subscribe((res:any) => {
                          if(res.status=='success')
                          {
                            this.api.post('saveinvitecode',{id:res.id,super_user_id:res.super_user_id,ref_field4:res.ref_field4,ref_field2:res.ref_field2,type:res.type}).subscribe((res1:any) => {
                              if(res1.status=='success')
                              {


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
                         });
                    });
                 });
  }

  ionViewDidLoad() {
    this.api.get('getrefermsg').subscribe((reshome:any) => {

      if(reshome.status=='success')
      {
         this.refermsg=reshome.refermsg;
         this.refermsg1=reshome.refermsg1;
         this.refermsg2=reshome.refermsg2;
         this.referimage=reshome.referimage;

      }
      });

    console.log('ionViewDidLoad RefferalPage');
  }

}

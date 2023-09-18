import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ModalController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
//import { CallNumber } from '@ionic-native/call-number';, private callNumber: CallNumber
@IonicPage()
@Component({
  selector: 'page-provider-vieworder',
  templateUrl: 'provider-vieworder.html',
})
export class ProviderVieworderPage {

  order_num:any;

orderhdr:any;
orderdtl:any;
deliverystatus:any;
deliverydate:any;
flowcountno:any;
userid:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController) {
this.order_num=this.navParams.get('order_num');
this.userid=this.navParams.get('userid'); 
  	  //	this.storage.get('userid').then((userid) => {
	  		this.api.post('getvieworderdetails',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
	  				this.orderhdr=res.orderhdr;
	  				this.orderdtl=res.orderdtl;
	  		});
	  //	});
  }

ChangStatus(order_num,itemnum,catid)
{
    let contactModal = this.modalCtrl.create('DeliverydatechangePage', {order_num:order_num,itemnum:itemnum,catid:catid});
        contactModal.onDidDismiss(data =>{ 
        });
        contactModal.present();

     /* let alert = this.alertCtrl.create({
    title: '',
    message: 'Do you want to change the delivery date?',
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
        handler: () => {
            let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();

          this.storage.get('userid').then((userid) => {
        this.api.post('completetheDateWork',{userid:userid, order_num:order_num,itemnum:itemnum,catid:catid}).subscribe((res:any) => {
          loading.dismiss();
                if(res.status=='success')
                {
                    let toast = this.toastCtrl.create({
                        message: 'Delivery date updated successfully',
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();

                    this.storage.get('userid').then((userid) => {
                      this.api.post('getvieworderdetails',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
                          this.orderhdr=res.orderhdr;
                          this.orderdtl=res.orderdtl;
                      });
                    });
                }
        });
      });


        }
      }
    ]
  });
  alert.present();
  
*/

  


}
  completeJob(order_num,itemnum)
  {
     // this.storage.get('userid').then((userid) => {
        this.api.post('completetheWork',{userid:this.userid, order_num:order_num,deliverystatus:this.deliverystatus,itemnum:itemnum}).subscribe((res:any) => {
                if(res.status=='success')
                {
                    let toast = this.toastCtrl.create({
                        message: 'Updated successfully',
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                          
                   // this.storage.get('userid').then((userid) => {
                      this.api.post('getvieworderdetails',{userid:this.userid, order_num:order_num}).subscribe((res:any) => {
                          this.orderhdr=res.orderhdr;
                          this.orderdtl=res.orderdtl;
                      });
                    //});
                }
        });
     // });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderVieworderPage');
  }

}

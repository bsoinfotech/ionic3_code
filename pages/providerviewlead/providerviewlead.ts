import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ModalController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-providerviewlead',
  templateUrl: 'providerviewlead.html',
})
export class ProviderviewleadPage {

  order_num:any;
orderdtl:any;
nval:any;
orderheader:any;
proid:any;
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController) {
this.order_num=this.navParams.get('order_num');
this.proid=this.navParams.get('proid');

          this.api.post('viewleadsmanagement',{userid:this.proid, order_num:this.order_num}).subscribe((res:any) => {
            if(res.status=='success')
            {
              this.nval=true;
              this.orderdtl=res.orderdtl;

              this.orderheader=res.orderheader;
            }
            else
            {
              this.nval=false;
              this.orderdtl=res.orderdtl;
            }
          });

  }

  doReject(order_num)
  {
      let alert = this.alertCtrl.create({
    title: '',
    message: 'Do you want to Reject this job?',
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
          this.api.post("doRejectjob", { order_num:order_num,userid:userid}).subscribe((resp:any) => {
          loading.dismiss();
            if(resp.status=='success')
            {
                let toast = this.toastCtrl.create({
                    message: 'Job Rejected',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            }
            });
          });
        }
      }
    ]
  });
  alert.present();
  }

  doAccept(order_num)
  {
      let alert = this.alertCtrl.create({
    title: '',
    message: 'Do you want to accept this job?',
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
          this.api.post("doAcceptjob", { order_num:order_num,userid:userid}).subscribe((resp:any) => {
          loading.dismiss();
            if(resp.status=='success')
            {
                let toast = this.toastCtrl.create({
                    message: 'Job Accepted',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            }
            });
          });
        }
      }
    ]
  });
  alert.present();
  }

   goChangedate(order_num)
  {
  		let contactModal = this.modalCtrl.create('ChangeproposepricePage', {order_num:this.order_num});
        contactModal.onDidDismiss(data =>{ 
            this.orderdtl=data[0];
            this.orderheader=data[1];
        });
        contactModal.present();
  }


  changePrice(order_num,item_number,price)
  {
      let contactModal = this.modalCtrl.create('ChangeproviderpricePage', {order_num:this.order_num,item_number:item_number,price:price});
        contactModal.onDidDismiss(data =>{ 
            this.orderdtl=data[0];
            this.orderheader=data[1];
        });
        contactModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderviewleadPage');
  }

}

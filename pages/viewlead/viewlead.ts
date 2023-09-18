import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ModalController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-viewlead',
  templateUrl: 'viewlead.html',
})
export class ViewleadPage {
order_num:any;
orderdtl:any;
nval:any;
orderheader:any;
pending:any;
orderdetails:any;
userid:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController, public viewCtrl: ViewController) {
this.order_num=this.navParams.get('order_num');
this.pending=this.navParams.get('pending');
this.userid=this.navParams.get('userid'); 
  		//this.storage.get('userid').then((userid) => {
          this.api.post('viewleadsmanagement',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
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
       // });
  }

dismiss() 
   {
     this.viewCtrl.dismiss();
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
          //this.storage.get('userid').then((userid) => {
          this.api.post("doRejectjob", { order_num:order_num,userid:this.userid}).subscribe((resp:any) => {
          loading.dismiss();
            if(resp.status=='success')
            {
                let toast = this.toastCtrl.create({
                    message: 'Job Rejected',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();

                // this.storage.get('userid').then((userid) => {
                    this.api.post('getnewleadmanagement',{userid:this.userid}).subscribe((res:any) => {
                          this.orderdetails=res.orderdetails;
                          this.viewCtrl.dismiss(this.orderdetails);
                    });
               // });
            }
            });
          //});
        }
      }
    ]
  });
  alert.present();
  }

  doAccept(order_num,yourprice,popupstatus)
  {
    //alert(popupstatus);
      if(popupstatus=='true')
      {
             let contactModal = this.modalCtrl.create('AgentpopupPage', {userid:this.userid,order_num:order_num,yourprice:yourprice});
                                                    contactModal.onDidDismiss(data =>{ 
                                                    this.orderdetails=data;
                                                    });
                                                    contactModal.present();
      }
      else
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
         // this.storage.get('userid').then((userid) => {
          this.api.post("doacceptcustomerbid", { order_num:order_num,userid:this.userid,yourprice:yourprice}).subscribe((resp:any) => {
          loading.dismiss();
            if(resp.status=='success')
            {
                let toast = this.toastCtrl.create({
                    message: 'Job Accepted',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
              this.navCtrl.setRoot('NewleadsPage');

            }
            
            });
         // });
        }
      }
    ]
  });
  alert.present();

      }
 
  }

   goChangedate(order_num)
  {
  		let contactModal = this.modalCtrl.create('ChangeproposepricePage', {userid:this.userid,order_num:this.order_num});
        contactModal.onDidDismiss(data =>{ 
            this.orderdtl=data[0];
            this.orderheader=data[1];
        });
        contactModal.present();
  }


  changePrice(order_num,item_number,price)
  {
      let contactModal = this.modalCtrl.create('ChangeproviderpricePage', {userid:this.userid,order_num:this.order_num,item_number:item_number,price:price});
        contactModal.onDidDismiss(data =>{ 
            this.orderdtl=data[0];
            this.orderheader=data[1];
        });
        contactModal.present();
  }

  ionViewDidLoad() {
    this.userid=this.navParams.get('userid'); 
    console.log('ionViewDidLoad ViewleadPage');
  }

}

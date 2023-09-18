import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ModalController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-selpromoorder',
  templateUrl: 'selpromoorder.html',
})
export class SelpromoorderPage {
promo_code:any;
orderlist:any;
nval:any;
order_num:any;
order_desc:any;


  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController,
  private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
  public modalCtrl: ModalController, public viewCtrl: ViewController) {


          this.promo_code=this.navParams.get('promo_code');

  				this.storage.get('userid').then((userid) => {
                    this.api.post('getPromoOrderList',{userid:userid,promo_code:this.promo_code}).subscribe((res:any) => {
                    	if(res.status=='success')
                    	{
                    	  this.nval=true;
                          this.orderlist=res.orderlist;
                    	}
                    	else
                    	{
                    	  this.nval=false;
                    	}
                    });
                });

  }

dismiss()
{
  this.viewCtrl.dismiss();
}

getorderdtl(order_num,order_desc)
{
  this.order_num=order_num;
  this.order_desc=order_desc;
}

doAccept(order_num,order_desc)
{
    if(order_num==0||order_num==''||order_num=='undefined')
    {
        let toast = this.toastCtrl.create({
        message: 'Please select one order',
        duration: 3000,
        position: 'bottom'
        });
        toast.present();
    }
    else
    {
      this.navCtrl.push('CustPaymentPage', {order_num:order_num,order_desc:order_desc});
    }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelpromoorderPage');
  }

}

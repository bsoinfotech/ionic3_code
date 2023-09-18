import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController,ViewController, ModalController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-custinvoice',
  templateUrl: 'custinvoice.html',
})
export class CustinvoicePage {
invoice:any;
orderhdrdtl:any;
order_num:any;
paymenttype:any;
paidamount:any;
userid:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public modalCtrl: ModalController,public viewCtrl: ViewController) {
  		this.order_num=this.navParams.get('order_num');
      this.userid=localStorage.getItem('userid');

  	  	//this.storage.get('userid').then((userid) => {
	  		this.api.post('getcustomerinvoicelatest',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
	  				this.invoice=res.invoice;
	  				this.orderhdrdtl=res.orderhdrdtl;
            this.paymenttype=res.paymenttype;
            this.paidamount=res.paidamount;
	  				//alert(JSON.stringify(this.invoice));
	  		});
	  	//});
  }

  AddNewline(order_num){

  let contactModal = this.modalCtrl.create('AddnewlinePage', {order_num:order_num});
        contactModal.onDidDismiss(data =>{
            this.invoice=data[0];
            this.orderhdrdtl=data[1];
        });
        contactModal.present();
  }



  modifyLine(order_num,itemname,service,itemprice,qty,discount)
  {
  let contactModal = this.modalCtrl.create('ModifylinePage', {order_num:order_num, itemname:itemname,service:service,itemprice:itemprice,qty:qty,discount:discount});
        contactModal.onDidDismiss(data =>{
            this.invoice=data[0];
            this.orderhdrdtl=data[1];
        });
        contactModal.present();
  }

  sendInvoice()
  {
      //this.storage.get('userid').then((userid) => {
		// biplab phase2 0825 -start
		let loading = this.loadingCtrl.create({
		spinner:'hide',
		content: '<img src="assets/img/busy.gif">',
		});
		loading.present();
		// biplab phase2 0825 -end
        this.api.post('invoicesendtomail',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
			loading.dismiss();  // biplab phase2 0825

              if(res.status=='success')
              {
                  let toast = this.toastCtrl.create({
                    message: 'Mail sent to '+res.to_id,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
              }
              else
              {
                let toast = this.toastCtrl.create({
                  message: res.msg ,
                  duration: 3000,
                  position: 'bottom'
              });
              toast.present();
              }
        });
      //});
  }

  dismiss()
  {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustinvoicePage');
  }

}

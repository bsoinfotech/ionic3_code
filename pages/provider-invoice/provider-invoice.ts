import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ModalController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-provider-invoice',
  templateUrl: 'provider-invoice.html',
})
export class ProviderInvoicePage {
invoice:any;
orderhdrdtl:any;
order_num:any;
paymenttype:any;
paidamount:any;
back:any;

price:any;
text:any;
cust_id:any;

sp_id:any;
cat_id:any;
userid:any;



  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController, public viewCtrl: ViewController) {
      this.back=this.navParams.get('back');
  		this.order_num=this.navParams.get('order_num');
        this.cust_id=this.navParams.get('cust_id');
		this.userid=this.navParams.get('userid'); 

  	  	//this.storage.get('userid').then((userid) => {
	  		this.api.post('getproviderinvoicelatest',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
	  				this.invoice=res.invoice;
	  				this.orderhdrdtl=res.orderhdrdtl;
            this.paymenttype=res.paymenttype;
            this.paidamount=res.paidamount;
			this.cat_id=res.cat_id;
			this.sp_id=res.sp_id;

			//alert(this.cat_id+'--'+this.sp_id);
	  				//alert(JSON.stringify(this.invoice));
	  		});
	  //	});
  }

   dismiss()
   {
     this.viewCtrl.dismiss();
     this.navCtrl.setRoot('TodayongoingjobsPage',{userid:this.userid});
   }
/*
Biplab phase3 0913
  sendInvoice()
  {
      this.storage.get('userid').then((userid) => {
        this.api.post('invoicesendtomail',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
              if(res.status=='success')
              {
                  let toast = this.toastCtrl.create({
                    message: 'Mail sent successfully',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
              }
        });
      });
  }
*/
  sendInvoice()
  {
     // this.storage.get('userid').then((userid) => {
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
                    message: 'Email id not set!. Set your email id under profile tab first',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
			  }
        });
     // });
  }

  ionViewDidLoad() {
	this.userid=this.navParams.get('userid'); 
    console.log('ionViewDidLoad ProviderInvoicePage');
  }

  AddNewline(order_num){

  let contactModal = this.modalCtrl.create('AddnewlinePage', {userid:this.userid,order_num:order_num});
        contactModal.onDidDismiss(data =>{
            this.invoice=data[0];
            this.orderhdrdtl=data[1];
        });
        contactModal.present();
  }



  modifyLine(order_num,itemname,service,itemprice,qty,discount,item_number)
  {

	this.api.post('chkorderstatus',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {


	  if(res.status=='success')
	  {
			let contactModal = this.modalCtrl.create('ModifylinePage', {userid:this.userid,order_num:order_num, itemname:itemname,service:service,itemprice:itemprice,qty:qty,discount:discount,item_number:item_number});
			contactModal.onDidDismiss(data =>{
			this.invoice=data[0];
			this.orderhdrdtl=data[1];
			});
			contactModal.present();
	  }
	  else
	  {
			let toast = this.toastCtrl.create({
			message: 'Job completed in system. You can not modify now. Call customer care',
			duration: 3000,
			position: 'bottom'
			});
			toast.present();

	  }

	});
  }

checkpartscost(userid,catid)
{



				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				//dismissOnPageChange: true
				//content: 'Loading Please Wait...'
				});
				loading.present();

				//this.navCtrl.setRoot('DashboardPage');
				//this.navCtrl.push('DashboardPage');
				this.navCtrl.push('PartsdtlPage',{userid:userid,catid:catid});
				loading.dismiss();




}

    gopaymentPage(order_num)
    {
       // this.storage.get('userid').then((userid) => {
                this.api.post('getpayementstatus',{userid:this.userid,order_num:order_num}).subscribe((res:any) => {
                      if(res.status=='success')
                      {
                      //  alert('cust_id='+this.cust_id);
                          this.navCtrl.push('ProviderPaymentPage', {userid:this.userid,order_num:order_num, cust_id:this.cust_id});
                      }
					  else
					  {
						  alert(res.msg)
					  }
                });
      //  });


    }

confirmcomplete(order_num)
   {

	//this.storage.get('userid').then((userid) => {
	this.api.post('getfunctindata',{userid:this.cust_id, order_num:this.order_num}).subscribe((res123:any) => {
	  if(res123.status=='success')
	  {
		  this.text=res123.text;
		  this.price=res123.price;


		// ===========================================================
			if(this.text=='01')
			{

				let toast = this.toastCtrl.create({
					message: 'You have received '+this.price+' Rs more than invoice price..please check your invoice detail',
					duration: 8000,
					position: 'bottom'
				});
				toast.present();
			}
			else if (this.text=='02')
			   {
				let toast = this.toastCtrl.create({
					message: "Please receive Rs "+this.price+" to complete the job",
					duration: 8000,
					position: 'bottom'
				});
				toast.present();
			}
			else if (this.text=='00')
			{
			//===========================================================

				  let alert = this.alertCtrl.create({
				title: '',
				message: 'Do you want to complete this job?',
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


					  this.navCtrl.push('ConfirmcodecPage',{order_num:order_num,userid:this.userid,cust_id:this.cust_id});


					}
				  }
				]
			  });
			  alert.present();
			}
       }
        });
       // });
   }




}

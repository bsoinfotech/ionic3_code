import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ModalController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-provider-payment',
  templateUrl: 'provider-payment.html',
})
export class ProviderPaymentPage {

  payments:any;
	order_num:any;
	paymenttype:any;
	price:any;
	//var input_price:number = 0;
	price_diff:any;
	cust_id:any;

  promoinfo:any;
  title:any;
  showpromosection:any;
  sp_access:any;
  promoapplied:any;
  promoapplyforallorder:any;

  duecouponmsg_sp:any;
  msg:any;
  msg1:any;
  msg2:any;
  allowpartner:any;
  flag:any;



  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController) {
this.order_num=this.navParams.get('order_num');
this.cust_id=this.navParams.get('cust_id');


/*
this.api.post('sp_coupon_access',{userid:this.cust_id, order_num:this.order_num}).subscribe((res:any) => {
  this.sp_access=res.sp_access;
});
*/
// allow partner to apply coupon on behalf of Customer
this.api.post('couponallowpartner',{userid:this.cust_id, order_num:this.order_num}).subscribe((res:any) => {
  this.allowpartner=res.allowpartner;
  this.msg1=res.msg1;
});

//-------------------------------------------------------

// Hard msg or soft msg to partner if customer not apply coupon before partner receive cash
this.api.post('duecouponmsg',{userid:this.cust_id, order_num:this.order_num}).subscribe((res:any) => {
  this.duecouponmsg_sp=res.duecouponmsg_sp;
  this.msg=res.msg;
  this.msg2=res.msg2;
});
//------------------------------------------------

this.api.post('validcouponfororder',{userid:this.cust_id, order_num:this.order_num}).subscribe((res:any) => {
  this.promoinfo=res.promoinfo;
  this.title=res.title;
  this.showpromosection=res.showpromosection;
  this.promoapplyforallorder=res.promoapplyforallorder;
});

  this.storage.get('userid').then((userid) => {
        this.api.post('getproviderpayments',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
              this.payments=res.payments;
        });
  });

        this.api.post('getdueamount',{userid:this.cust_id, order_num:this.order_num}).subscribe((res:any) => {
            this.price=res.dueamount;
        });


  }

  payment(order_num)
{
    this.flag=0; // no error
    if (this.showpromosection==1)
    {
      if (this.duecouponmsg_sp==2 && this.promoapplyforallorder==0)
      {
          this.flag=2;  //hard error
      }
      if (this.duecouponmsg_sp==1 && this.promoapplyforallorder==0)
      {
          this.flag=1; //soft error
      }

    }



  if (this.flag==2)
  {

    let alert = this.alertCtrl.create({
    title: this.msg,
    message: '',
    buttons: [
                {
                text: 'Ok',
                handler: () =>{

                              }
                }
              ]
    });
    alert.present();
  }
  else if (this.flag==1)
  {
    let alert = this.alertCtrl.create({
    title: this.msg2,
    message: '',
    buttons: [
                {
                  text: 'No',
                  role: 'No',
                  handler: () => {

                    console.log('Cancel clicked');
                  }
                },
                {
                text: 'Yes',
                handler: () =>{
                                //this.flag=0;
                                //--------------------------------------------
                                this.api.post('getdueamount',{userid:this.cust_id, order_num:this.order_num}).subscribe((res:any) => {
                          			this.price_diff = res.dueamount - this.price;

                          			//if(res.dueamount < this.price)
                          			if (this.price <=0)
                          			{
                          				      let toast = this.toastCtrl.create({
                                                message: 'You can not received <=0 Amount',
                                                duration: 3000,
                                                position: 'bottom'
                                            });
                                            toast.present();
                          			}
                          			else if (this.price_diff < 0 )
                                      {
                                          let toast = this.toastCtrl.create({
                                                message: 'Amount (Rs: '+this.price+') more than the due amount (Rs: '+res.dueamount+')',
                                                duration: 3000,
                                                position: 'bottom'
                                            });
                                            toast.present();
                                      }

                                      else if(this.paymenttype=='' || this.paymenttype==undefined)
                                      {
                                          let toast = this.toastCtrl.create({
                                                message: 'Select Payment Type',
                                                duration: 3000,
                                                position: 'bottom'
                                            });
                                            toast.present();
                                      }
                                      else
                                      {
                                      let alert = this.alertCtrl.create({
                              title: 'Received Amt Rs '+this.price+'  Click Ok to Proceed',
                              message: '',
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
                                              //biplab phase2 0731
                          					//this.api.post('dopayment',{order_num:order_num, price:this.price,paymenttype:this.paymenttype}).subscribe((res:any) => {
                          						 this.api.post('dopayment',{order_num:order_num, paymenttype:this.paymenttype,price:this.price}).subscribe((res:any) => {

                          								 if(res.status=='success')
                                                            {
                                                                 let toast = this.toastCtrl.create({
                                                                        message: 'Payment successfully done',
                                                                        duration: 3000,
                                                                        position: 'bottom'
                                                                    });
                                                                    toast.present();
                                                                    // biplab phase2 0729 - back to invoice screen after received the payment
                          										  this.navCtrl.push('ProviderInvoicePage', {order_num:order_num});
                          			                             }
                                                      });
                                      }
                                    }
                                  ]
                                });
                                alert.present();
                                    }

                                  });

                                //---------------------------------------------
                              }
                }
              ]
    });
    alert.present();


  }

  else if (this.flag=='0')
  {

      this.api.post('getdueamount',{userid:this.cust_id, order_num:this.order_num}).subscribe((res:any) => {
			this.price_diff = res.dueamount - this.price;

			//if(res.dueamount < this.price)
			if (this.price <=0)
			{
				      let toast = this.toastCtrl.create({
                      message: 'You can not received <=0 Amount',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
			}
			else if (this.price_diff < 0 )
            {
                let toast = this.toastCtrl.create({
                      message: 'Amount (Rs: '+this.price+') more than the due amount (Rs: '+res.dueamount+')',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
            }

            else if(this.paymenttype=='' || this.paymenttype==undefined)
            {
                let toast = this.toastCtrl.create({
                      message: 'Select Payment Type',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
            }
            else
            {
            let alert = this.alertCtrl.create({
    title: 'Received Amt Rs '+this.price+'  Click Ok to Proceed',
    message: '',
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
                    //biplab phase2 0731
					//this.api.post('dopayment',{order_num:order_num, price:this.price,paymenttype:this.paymenttype}).subscribe((res:any) => {
						 this.api.post('dopayment',{order_num:order_num, paymenttype:this.paymenttype,price:this.price}).subscribe((res:any) => {

								 if(res.status=='success')
                                  {
                                       let toast = this.toastCtrl.create({
                                              message: 'Payment successfully done',
                                              duration: 3000,
                                              position: 'bottom'
                                          });
                                          toast.present();
                                          // biplab phase2 0729 - back to invoice screen after received the payment
										  this.navCtrl.push('ProviderInvoicePage', {order_num:order_num});
			                             }
                            });
            }
          }
        ]
      });
      alert.present();
          }

        });
  }
}

//----------------------------------------applypromo------------------
applypromo(order_num,promo_code,promo_amt)
{

//--------------------------
    this.api.post('checkcoupon',{order_num:order_num, price:promo_amt,promo_code:promo_code}).subscribe((res1:any) => {
      this.promoapplied= res1.promoapplied;

    });
//-----------------------

          if(promo_code=='' || promo_code==undefined)
          {
              let toast = this.toastCtrl.create({
                    message: 'Coupon Code Not Selected',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();

          }
          else if (promo_amt=='' || promo_amt==undefined || promo_amt=='0')
          {
            let toast = this.toastCtrl.create({
                  message: 'Coupon amt can not be zero',
                  duration: 3000,
                  position: 'bottom'
              });
              toast.present();
          }
          else if (this.promoapplied >0)
          {
            let toast = this.toastCtrl.create({
                  message: 'Coupon already applied for this order',
                  duration: 3000,
                  position: 'bottom'
              });
              toast.present();
          }
          else
          {

          let alert = this.alertCtrl.create({
  title: 'Click Ok to Apply Coupon',
  message: '',
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
                    this.api.post('couponpayment',{order_num:order_num, price:promo_amt,paymenttype:'2',promo_code:promo_code}).subscribe((res:any) => {
                          if(res.status=='success')
                          {
                               let toast = this.toastCtrl.create({
                                      message: 'Coupon Applied Successfully',
                                      duration: 3000,
                                      position: 'bottom'
                                  });
                                  toast.present();
                                //  this.navCtrl.push('CustinvoicePage', {order_num:order_num});
                                  this.navCtrl.push('ProviderInvoicePage', {order_num:order_num,cust_id:this.cust_id});
                          }
                          else
                          {
                            let toast = this.toastCtrl.create({
                                  message: res.msg,
                                  duration: 3000,
                                  position: 'bottom'
                              });
                              toast.present();
                          }

                        });
                    }
                  }
                ]
              });
              alert.present();
          }
}
//----------------------------------------------------------------------


  ionViewDidLoad() {

    console.log('ionViewDidLoad ProviderPaymentPage');
  }

}

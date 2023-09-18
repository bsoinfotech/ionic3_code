import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ModalController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
declare var RazorpayCheckout: any;
@IonicPage()
@Component({
  selector: 'page-cust-payment',
  templateUrl: 'cust-payment.html',
})
export class CustPaymentPage {
	payments:any;
	order_num:any;
	paymenttype:any;
	price:any;
	//biplab phase2 0811
	raser:any;
	raserstatus:any;
  promoinfo:any;
  title:any;
  showtitle:any;
  cat_id:any;
  order_desc:any;
  showpromosection:any;
  promoapplied:any;
  userid:any;


  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController) {
this.order_num=this.navParams.get('order_num');
this.order_desc=this.navParams.get('order_desc');
this.userid=localStorage.getItem('userid');

  //this.storage.get('userid').then((userid) => {
        this.api.post('getpayments',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
              this.payments=res.payments;
        });
  //});

  //this.storage.get('userid').then((userid) => {
        this.api.post('getdueamount',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
              this.price=res.dueamount;
        });
  //});

  //----------------------------------------------------

  //this.storage.get('userid').then((userid) => {
        this.api.post('getcouponfororder',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
          this.promoinfo=res.promoinfo;
          this.title=res.title;
          this.showpromosection=res.showpromosection;
        });
 // });

  /*
  //this.storage.get('userid').then((userid) => {
  this.api.get('getcouponfororder',{userid:userid,order_num:this.order_num,catid:this.cat_id}).subscribe((res:any) => {

     if(res.status=='success')
     {
         this.promoinfo=res.promoinfo;
         this.title=res.title;
         this.showpromosection=res.showpromosection;
        // this.scatname=res.scatname;

     }
     else
     {
         // this.general.hideLoading();
          this.general.showToast(res.message);
     }
   });
  });
  */
  //------------------------------------------------------


  }

  payment(order_num)
{
            if(this.paymenttype=='' || this.paymenttype==undefined)
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
    title: 'Click Ok to Proceed',
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
                    if(this.paymenttype=='1')
                    {
                            this.api.post('dopayment',{order_num:order_num, price:this.price,paymenttype:this.paymenttype}).subscribe((res:any) => {
                                  if(res.status=='success')
                                  {
                                       let toast = this.toastCtrl.create({
                                              message: 'Payment successfully updated',
                                              duration: 3000,
                                              position: 'bottom'
                                          });
                                          toast.present();
                                          this.navCtrl.push('CustinvoicePage', {order_num:order_num});
                                  }

                            });
                    }
                    else if(this.paymenttype=='2')
                    {
                            this.api.post('dopayment',{order_num:order_num, price:this.price,paymenttype:this.paymenttype}).subscribe((res:any) => {
                                  if(res.status=='success')
                                  {
                                       let toast = this.toastCtrl.create({
                                              message: 'Payment successfully updated',
                                              duration: 3000,
                                              position: 'bottom'
                                          });
                                          toast.present();
                                          this.navCtrl.push('CustinvoicePage', {order_num:order_num});
                                  }
								  if(res.status=='insuf_bal')
                                  {
                                       let toast = this.toastCtrl.create({
                                              message: 'You do not have sufficient balance',
                                              duration: 3000,
                                              position: 'bottom'
                                          });
                                          toast.present();

                                  }

                            });
                    }
                    else if(this.paymenttype=='3')
                    /* biplab phase2 0811
					{
                            let amount = this.price+'00';
                              var options = {
                                description: this.order_num,
                                //image: 'https://i.imgur.com/3g7nmJC.png',
                                currency: 'INR',
                                key: 'rzp_live_1dna8VzVTP94TL',
                                amount: amount,
                                name: 'job',
                                prefill: {
                                  email: 'servicesarkar18@gmail.com',
                                  contact: '8820472285',
                                  name: 'Sarkar'
                                },
                                theme: {
                                  color: '#F37254'
                                },
                                modal: {
                                  ondismiss: function() {
                                    //alert('dismissed')
                                  }
                                }
                              };
                              let me = this;
                              var successCallback = function(payment_id) {
                                //alert('payment_id: ' + payment_id);

                                  me.api.post('dopayment',{order_num:order_num, price:me.price,paymenttype:me.paymenttype}).subscribe((res:any) => {
                                  if(res.status=='success')
                                  {
                                       let toast = me.toastCtrl.create({
                                              message: 'Payment successfully updated',
                                              duration: 3000,
                                              position: 'bottom'
                                          });
                                          toast.present();


                                          me.navCtrl.push('CustinvoicePage', {order_num:order_num});
                                  }
                            });
                              };

                              var cancelCallback = function(error) {
                                //alert(error.description + ' (Error ' + error.code + ')');
                              };
                              RazorpayCheckout.open(options, successCallback, cancelCallback);
                    }
					*/
					{
					//-------added by biplab phase2 on 0811 ------------------------------
						this.api.post('raserpaytestandlivemode',{}).subscribe((res1:any) => {
						this.raserstatus=res1.raserstatus;
						if(this.raserstatus=='live')
						{
						this.raser='rzp_live_1dna8VzVTP94TL';
						}
						else
						{
						this.raser='rzp_test_1DP5mmOlF5G5ag';
						}
				  //-------------------------------

                            let amount = this.price+'00';
                              var options = {
                                description: this.order_num,
                                //image: 'https://i.imgur.com/3g7nmJC.png',
                                currency: 'INR',
                                //key: 'rzp_live_1dna8VzVTP94TL',
								key: this.raser,
                                amount: amount,
								//status: 'captured',  //added biplab on 11192019 to capture payment automatically
								//payment_capture=1,		//added biplab on 11192019 to capture payment automatically
								captured: true,
                                name: 'Order:',
                                prefill: {
                                  email: 'servicesarkar18@gmail.com',
                                  contact: '8585880402',
                                  name: 'BsoApp'
                                },
                                theme: {
                                  color: '#F37254'
                                },
                                modal: {
                                  ondismiss: function() {
                                    //alert('dismissed')
                                  }
                                }
                              };
                              let me = this;
                              var successCallback = function(payment_id) {
                                //alert('payment_id: ' + payment_id);

                                  me.api.post('dopayment',{order_num:order_num, price:me.price,paymenttype:me.paymenttype}).subscribe((res:any) => {
                                  if(res.status=='success')
                                  {
                                       let toast = me.toastCtrl.create({
                                              message: 'Payment successfully updated',
                                              duration: 3000,
                                              position: 'bottom'
                                          });
                                          toast.present();


                                          me.navCtrl.push('CustinvoicePage', {order_num:order_num});
                                  }
                            });
                              };

                              var cancelCallback = function(error) {
                                // alert(error.description + ' (Error ' + error.code + ')');
                              };
                              RazorpayCheckout.open(options, successCallback, cancelCallback);
                    });
					}

        }
      }
    ]
  });
  alert.present();



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
                                  this.navCtrl.push('CustinvoicePage', {order_num:order_num});
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
    console.log('ionViewDidLoad CustPaymentPage');
  }

}

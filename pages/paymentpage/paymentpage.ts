import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

declare var RazorpayCheckout: any;
@IonicPage()
@Component({
  selector: 'page-paymentpage',
  templateUrl: 'paymentpage.html',
})
export class PaymentpagePage {
price:any;
cashafterservice:any;
minorder:any;
bidscreen:any;
payments:any;
order:any;
ref3:any;
  constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,public api: Api,public navParams: NavParams, public toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController) 
  {
        this.order=this.navParams.get('order');
        this.ref3=this.navParams.get('ref3');

  	this.price=this.navParams.get('price');
      this.storage.get('userid').then((userid) => {
          this.api.post('getpayments',{userid:userid}).subscribe((res:any) => {
              this.payments=res.payments;
          });
    });

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentpagePage');
  }


gotoNetScreen()
{
					  if(this.cashafterservice=='' || this.cashafterservice==undefined)
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
                      	this.navCtrl.setRoot('SuccesspagePage',{cashafterservice:this.cashafterservice,price:this.price,order:this.order,ref3:this.ref3});
                      }


}
/*
gotoNetScreen()
{
 this.storage.get('catid').then(catid=>{
    this.api.post('getminimumOrder', { catid:catid, price:this.price}).subscribe((res:any) => {
              this.minorder=res.minorder;
              if(this.minorder==false)
              {
                  let toast = this.toastCtrl.create({
                    message: res.message,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
              }
              else
              {
                      if(this.cashafterservice=='' || this.cashafterservice==undefined)
                      {
                          let toast = this.toastCtrl.create({
                              message: 'Select Pay after service ( Cash/Online )',
                              duration: 3000,
                              position: 'bottom'
                          });
                          toast.present();
                      }
                      else if(this.cashafterservice=='3')
                      {
                        let amount = this.price+'00';
                          var options = {
                            description: '',
                            //image: 'https://i.imgur.com/3g7nmJC.png',
                            currency: 'INR',
                            key: 'rzp_live_1dna8VzVTP94TL',
                            amount: amount,
                            name: 'New Order',
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
                                alert('dismissed');
                              }
                            }
                          };
                         let me = this;
                          var successCallback = function(payment_id) {

                           //alert('payment_id: ' + payment_id);
                         
                               me.storage.get('catid').then(catid=>{
                                                    me.storage.get('catidarr').then((catidarr) => {
                                                        me.storage.get('catqty').then((catqty) => {
                                                          me.storage.get('customeraddress').then((customeraddress) => {
                                                            me.storage.get('startdate').then(startdate=>{
                                                                me.storage.get('starttime').then(starttime=>{
                                                                        me.storage.get('enddate').then(enddate=>{
                                                                            me.storage.get('endtime').then(endtime=>{
                                                                            me.storage.get('bidding').then(bidding=>{
                                                                              me.storage.get('userid').then(userid=>{
                                                                               
                                                                               me.api.post('doOrder1', { catid:catid,catidarr:catidarr, catqty:catqty,customeraddress:customeraddress,startdate:startdate,starttime:starttime,enddate:enddate,endtime:endtime,userid:userid,cashafterservice:this.cashafterservice,bidding:bidding,servicetype:me.cashafterservice}).subscribe((res:any) => {
                                                                                    if(res.status=='success')
                                                                                    {
                                                                                        let toast = me.toastCtrl.create({
                                                                                            message: 'Order created successfully',
                                                                                            duration: 3000,
                                                                                            position: 'bottom'
                                                                                        });
                                                                                        toast.present();

                                                                                        //me.navCtrl.setRoot('BiddingPage',{orderid:res.orderid}); 
                                                                                            me.navCtrl.setRoot('SuccesspagePage',{orderid:res.orderid,servicetype:me.cashafterservice,price:this.price});
                                                                                                  

                                                                                    }
                                                                                 });
                                                                                });
                                                                              });
                                                                            });
                                                                        });
                                                                });
                                                            });
                                                          });
                                                        });
                                                    });
                                                }); 

                          };

                          var cancelCallback = function(error) {
                            alert(error.description + ' (Error ' + error.code + ')');
                          };

                          RazorpayCheckout.open(options, successCallback, cancelCallback);
                        
                      }
                      else if(this.cashafterservice=='2')
                      {


                            this.storage.get('catid').then(catid=>{
                            this.storage.get('catidarr').then((catidarr) => {
                                this.storage.get('catqty').then((catqty) => {
                                  this.storage.get('customeraddress').then((customeraddress) => {
                                    this.storage.get('startdate').then(startdate=>{
                                        this.storage.get('starttime').then(starttime=>{
                                                this.storage.get('enddate').then(enddate=>{
                                                    this.storage.get('endtime').then(endtime=>{
                                                    this.storage.get('bidding').then(bidding=>{
                                                      this.storage.get('userid').then(userid=>{
                                                       this.api.post('doOrder', { catid:catid,catidarr:catidarr, catqty:catqty,customeraddress:customeraddress,startdate:startdate,starttime:starttime,enddate:enddate,endtime:endtime,userid:userid,cashafterservice:this.cashafterservice,bidding:bidding,servicetype:this.cashafterservice}).subscribe((res:any) => {
                                                            if(res.status=='success')
                                                            {
                                                                let toast = this.toastCtrl.create({
                                                                    message: 'Order created successfully',
                                                                    duration: 3000,
                                                                    position: 'bottom'
                                                                });
                                                                toast.present();

                                                                //this.navCtrl.setRoot('BiddingPage',{orderid:res.orderid}); 
                                                                    this.navCtrl.setRoot('SuccesspagePage',{orderid:res.orderid,servicetype:this.cashafterservice,price:this.price});
                                                                          

                                                            }
                                                         });
                                                        });
                                                      });
                                                    });
                                                });
                                        });
                                    });
                                  });
                                });
                            });
                        });
                      }
                      else
                      {


                            this.storage.get('catid').then(catid=>{
                            this.storage.get('catidarr').then((catidarr) => {
                                this.storage.get('catqty').then((catqty) => {
                                  this.storage.get('customeraddress').then((customeraddress) => {
                                    this.storage.get('startdate').then(startdate=>{
                                        this.storage.get('starttime').then(starttime=>{
                                                this.storage.get('enddate').then(enddate=>{
                                                    this.storage.get('endtime').then(endtime=>{
                                                    this.storage.get('bidding').then(bidding=>{
                                                      this.storage.get('userid').then(userid=>{
                                                       this.api.post('doOrder', { catid:catid,catidarr:catidarr, catqty:catqty,customeraddress:customeraddress,startdate:startdate,starttime:starttime,enddate:enddate,endtime:endtime,userid:userid,cashafterservice:this.cashafterservice,bidding:bidding,servicetype:this.cashafterservice}).subscribe((res:any) => {
                                                            if(res.status=='success')
                                                            {
                                                                let toast = this.toastCtrl.create({
                                                                    message: 'Order created successfully',
                                                                    duration: 3000,
                                                                    position: 'bottom'
                                                                });
                                                                toast.present();

                                                                //this.navCtrl.setRoot('BiddingPage',{orderid:res.orderid}); 
                                                                    this.navCtrl.setRoot('SuccesspagePage',{orderid:res.orderid,servicetype:this.cashafterservice,price:this.price});
                                                                          

                                                            }
                                                         });
                                                        });
                                                      });
                                                    });
                                                });
                                        });
                                    });
                                  });
                                });
                            });
                        });
                      }
              }
    });
});
    
	
} */

}

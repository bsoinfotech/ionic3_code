import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

declare var RazorpayCheckout: any;

@IonicPage()
@Component({
  selector: 'page-successpage',
  templateUrl: 'successpage.html', 
})
export class SuccesspagePage {
orderid:any;
price:any;
cashafterservice:any;
minorder:any;
bidscreen:any;
payments:any;
order:any;
ref3:any;
raserstatus:any;
raser:any;
  constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,public api: Api,public navParams: NavParams, public toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController) {

  this.price=this.navParams.get('price');
  this.orderid=this.navParams.get('orderid');
        this.order=this.navParams.get('order');
        this.ref3=this.navParams.get('ref3');
  this.cashafterservice=this.navParams.get('cashafterservice');
  this.gotoNetScreen();
  }




gotoNetScreen()
{

 this.storage.get('catid').then(catid=>{
	
// biplab phase2 0824 - start
let loading = this.loadingCtrl.create({
spinner:'hide',
content: '<img src="assets/img/busy.gif">',
});
loading.present();
// biplab phase2 0824 -end
		  
		  
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
                this.navCtrl.setRoot('JobPage'); 
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

							this.api.post('raserpaytestandlivemode',{}).subscribe((res:any) => {
							this.raserstatus=res.raserstatus;
							if(this.raserstatus=='live')
							{
							  this.raser='rzp_live_1dna8VzVTP94TL';
							}
							else
							{
							  this.raser='rzp_test_1DP5mmOlF5G5ag';
							}
							
               
                          let amount = this.price+'00';
                          var options = {
                            description: '',
                            //image: 'https://i.imgur.com/3g7nmJC.png',
                            currency: 'INR',
                            key: this.raser,
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
                                                                               
                                                                               me.api.post('doOrder', { catid:catid,catidarr:catidarr, catqty:catqty,customeraddress:customeraddress,startdate:startdate,starttime:starttime,enddate:enddate,endtime:endtime,userid:userid,cashafterservice:me.cashafterservice,bidding:bidding,order:me.order,ref3:me.ref3}).subscribe((res:any) => {
                                                                                    // biplab phase2 0824
																					loading.dismiss();
																					// 0824
																					if(res.status=='success')
                                                                                    {
                                                                                        let toast = me.toastCtrl.create({
                                                                                            message: 'Order created successfully',
                                                                                            duration: 3000,
                                                                                            position: 'bottom'
                                                                                        });
                                                                                        toast.present();
                                                                                        me.orderid=res.orderid;
                                                                                      
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
                        });
                      }
                      else  //for cash and wallet payment mode
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
                                                       this.api.post('doOrder', { catid:catid,catidarr:catidarr, catqty:catqty,customeraddress:customeraddress,startdate:startdate,starttime:starttime,enddate:enddate,endtime:endtime,userid:userid,cashafterservice:this.cashafterservice,bidding:bidding,order:this.order,ref3:this.ref3}).subscribe((res:any) => {
															 // biplab phase2 0824
															loading.dismiss();
															// 0824                                                           
															if(res.status=='success')
                                                            {
                                                                let toast = this.toastCtrl.create({
                                                                    message: 'Order created successfully',
                                                                    duration: 3000,
                                                                    position: 'bottom'
                                                                });
                                                                toast.present();

                                                                 this.orderid=res.orderid;     

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
    
  
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad SuccesspagePage');
  }

  goHomepage()
  {
  		this.navCtrl.setRoot('JobPage');
      localStorage.setItem('catid','');
      localStorage.setItem('catidarr','');
      localStorage.setItem('catqty','');
      localStorage.setItem('customeraddress','');
      localStorage.setItem('startdate','');
      localStorage.setItem('starttime','');
      localStorage.setItem('enddate','');
      localStorage.setItem('endtime','');
      localStorage.setItem('bidding','');       
  }

}

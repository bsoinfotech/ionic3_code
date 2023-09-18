import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
declare var RazorpayCheckout: any;

@IonicPage()
@Component({
  selector: 'page-paymentpurchagescreen',
  templateUrl: 'paymentpurchagescreen.html',
})
export class PaymentpurchagescreenPage {
package:any;
order_num:any;
price:any;
payment:any;
raser:any;
raserstatus:any;
total_credit:any;
cost_gst:any;

phone:any;
name:any;


  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
	this.package=this.navParams.get('package');
      this.storage.get('userid').then((userid) => {
	  		this.api.post('credit_paymentscreen',{userid:userid,packid:this.package}).subscribe((res:any) => {
	  			this.order_num=res.order_num;
	  			this.price=res.price;
	  			this.payment=res.payment;
				//biplab phase3 0925
				this.total_credit=res.total_credit;
	  			this.cost_gst=res.cost_gst;
				
				this.phone= res.phone;
				this.name=res.name;
				
				
	  		});
	  });
  }

  goRaserpay(paymode_id,price,ordernumber,total_credit,cost_gst,phone,name)
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

        let amount = price+'00';
          var options = {
            description: ordernumber,
		//	order_id: ordernumber, //bs
            //image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            //key: 'rzp_test_1DP5mmOlF5G5ag',
            key: this.raser,
            amount: amount,
			status: 'captured',  //added biplab on 11192019 to capture payment automatically
            name: 'Purchase Credit',
		//	status: 'authorized',  //bs
		//	captured: true,        //bs
		//	notes: 'credit purchase', //bs
            prefill: {
              email: 'servicesarkar18@gmail.com',
              //contact: '8585880402',
              //name: 'Service Sarkar'
			  
			  contact: phone,
              name: name
			  
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
          	me.storage.get('userid').then((userid) => {
		  		me.api.post('credit_resorpay',{userid:userid,ordernumber:ordernumber,package:me.package,price:price,paymode_id:paymode_id,total_credit:total_credit,cost_gst:cost_gst}).subscribe((res:any) => {
              me.navCtrl.setRoot('DashboardPage');
		  		});
	  		});
          };

          var cancelCallback = function(error) {
            alert(error.description + ' (Error ' + error.code + ')');
          };

          RazorpayCheckout.open(options, successCallback, cancelCallback);   
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentpurchagescreenPage');
  }

}

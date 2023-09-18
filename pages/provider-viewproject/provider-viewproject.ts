import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ModalController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
//import { CallNumber } from '@ionic-native/call-number';, private callNumber: CallNumber

declare var RazorpayCheckout: any;

@IonicPage()
@Component({
  selector: 'page-provider-viewproject',
  templateUrl: 'provider-viewproject.html',
})
export class ProviderViewprojectPage {

  order_num:any;
viewproject:any;
nval:any;
orderdetails:any;
pet:any;
providerdata:any;
name:any;
sstatus:any;
startdate:any;
starttime:any;
enddate:any;
endtime:any;
viewprojectstatus:any;
startdateflag:any;
enddateflag:any;
todayjobs:any;
price:any;
text:any;
cust_id:any;
dattt:any;
monthh:any;
date1:any;
fdate:any;
not:any;
notifications:any;

agent_id:any;
showagent:any;
gurl:any;

cust_lat:any;
cust_lng:any;
notice:any;
userid:any;



  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController,
  private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
  public modalCtrl: ModalController, public viewCtrl: ViewController,private iab: InAppBrowser) {
      this.not=this.navParams.get('not');
  		this.order_num=this.navParams.get('order_num');
      this.cust_id=this.navParams.get('cust_id');
      this.userid=this.navParams.get('userid');

	  		this.api.post('getproviderprojectdetails',{userid:this.cust_id, order_num:this.order_num}).subscribe((res:any) => {

	  				this.nval=true;
	  				this.viewproject=res.viewproject;
	  				this.viewprojectstatus=res.viewprojectstatus;
					this.gurl=res.gurl;
					this.showagent = res.showagent;
					this.agent_id= res.agent_id;
					this.cust_lat=res.cust_lat;
					this.cust_lng=res.cust_lng;

				});
			this.api.post('partner_notice',{userid:this.cust_id, order_num:this.order_num}).subscribe((res:any) => {

	  				//this.nval=true;
	  				this.notice=res.notice;

	  		});





  	  /*	this.storage.get('userid').then((userid) => {
	  		this.api.post('getordercustmerdetails',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
	  				this.orderdetails=res.orderdetails;
	  				this.providerdata=res.providerdata;
	  		});
	  	}); */
	  	this.pet='order';

	  	this.sstatus='hide';

	  //	this.storage.get('userid').then((userid) => {
	  		this.api.post('getscheduledate',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
	  			this.startdate=res.scheduledata.sdate;
	  			this.starttime=res.scheduledata.stime;
	  			this.enddate=res.scheduledata.edate;
	  			this.endtime=res.scheduledata.etime;
	  			this.startdateflag=res.scheduledata.startdateflag;
	  			this.enddateflag=res.scheduledata.enddateflag;
	  		});
	  	//});


     /*
        this.api.post('getfunctindata',{userid:this.cust_id, order_num:this.order_num}).subscribe((res:any) => {
            this.text=res.text;
            this.price=res.price;
        });
	*/

  }

   ngOnInit() {
  this.date1 = new Date();
  this.date1.setDate( this.date1.getDate() + 30 );
  let m= this.date1.getMonth()+1
    if(m==9 || m==10 || m==11)
    {
        this.monthh=m;
    }
    else
    {

        this.monthh='0'+m;
    }
    let dd=this.date1.getDate();

  if(dd==1 || dd==2 || dd==3 || dd==4 || dd==5 || dd==6 || dd==7 || dd==8 || dd==9)
  {

     this.dattt = '0'+this.date1.getDate();
  }
  else
  {
    this.dattt = this.date1.getDate();
  }
  this.fdate=this.date1.getFullYear()+'-'+this.monthh+'-'+this.dattt;
}




  goDetails(order_num)
  {
  		this.navCtrl.push('ProviderVieworderPage', {userid:this.userid,order_num:order_num});
  }

  updateCucumber()
  {
  	//alert(this.name);
  }

  showProviderDetails(stat)
  {
  		if(stat=='show')
  		{
  			this.sstatus='show';
  		}
  		else
  		{
  			this.sstatus='hide';
  		}

  }
  awardClose()
  {
  this.sstatus='hide';
  }
  awardtheBid()
  {
  	if(this.name=='' || this.name==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Select Provider',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
    else
    {

	  	this.order_num=this.navParams.get('order_num');
	  	//	this.storage.get('userid').then((userid) => {
		  		this.api.post('saveproviderbid',{userid:this.userid, order_num:this.order_num, provider:this.name}).subscribe((res:any) => {
		  			if(res.status=='success')
		  			{
		  					let toast = this.toastCtrl.create({
					            message: 'Bid awarded successfully',
					            duration: 3000,
					            position: 'bottom'
					        });
					        toast.present();

					        this.sstatus='hide';
		  			}
		  	});
  		//});
  	}
  }

	govieworderPage(order_num)
	  {
	  		this.navCtrl.push('ProviderVieworderPage', {userid:this.userid, order_num:order_num});
	  }

	  goinvoicePage(order_num)
	  {
	  		this.navCtrl.push('ProviderInvoicePage', {order_num:order_num,cust_id:this.cust_id});
	  }

    gopaymentPage(order_num)
    {
       // this.storage.get('userid').then((userid) => {
                this.api.post('getpayementstatus',{userid:this.userid,order_num:order_num}).subscribe((res:any) => {
                      if(res.status=='success')
                      {

                          this.navCtrl.push('ProviderPaymentPage', {order_num:order_num, cust_id:this.cust_id});
                      }
                });
       // });


    }
/*
    notComplete(price)
    {
        let toast = this.toastCtrl.create({
            message: 'You have received '+price+' Rs more than invoice price..please check your invoice detail',
            duration: 8000,
            position: 'bottom'
        });
        toast.present();
    }
    notComplete1(price)
    {
        let toast = this.toastCtrl.create({
            message: "Please receive Rs "+price+" to complete the job",
            duration: 8000,
            position: 'bottom'
        });
        toast.present();
    }
*/

/*calltoProvider(phonenumber)
{
	this.callNumber.callNumber(phonenumber, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
} */


gotoNetScreen()
{
	 // this.storage.get('userid').then(userid=>{
	    this.api.post('saveresheduledata', { userid:this.userid, startdate:this.startdate,starttime:this.starttime,enddate:this.enddate,endtime:this.endtime,order_num:this.order_num  }).subscribe((res:any) => {


	    if(res.status=='success')
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Reschedule success',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();
	    }

	    });
	 // });
}

doCanceljob(order_num)
{


  		let alert = this.alertCtrl.create({
    title: '',
    message: 'Do you want to cancel this job?',
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
         this.storage.get('userid').then(userid=>{
          this.api.post("cancelproviderOrder", { order_num:order_num,userid:userid}).subscribe((resp:any) => {
          loading.dismiss();
          	if(resp.status=='success')
          	{
                let toast = this.toastCtrl.create({
	                  message: 'Your job cancelled',
	                  duration: 3000,
	                  position: 'bottom'
	              });
	              toast.present();
	              this.navCtrl.setRoot('JobhistoryPage',{userid:this.userid});
          	}
            });
         });
        }
      }
    ]
  });
  alert.present();

}



 goPopuppage(random){


	// this.viewprojectstatus

	//alert('agentid='+this.agent_id+'  Showagent='+this.showagent);

	if(this.showagent==1 && this.agent_id==null)
	{
		alert('Assign Agent Before Job Start..');

	}
	else
	{
//alert('Order='+this.order_num+' Random='+random);

		let contactModal = this.modalCtrl.create('ConfirmcodePage', {random:random,order_num:this.order_num});
        contactModal.onDidDismiss(data =>{
            this.viewproject=data[0];
           // this.viewproject=data;
            this.viewprojectstatus=data[1];
           // this.viewprojectstatus=data;
        });
        contactModal.present();
	}
  }

  //workinprogress
   workinprogress(random){

		let contactModal = this.modalCtrl.create('Confirmcode2Page', {random:random,order_num:this.order_num});
        contactModal.onDidDismiss(data =>{
            this.viewproject=data[0];
            //this.viewproject=data;
            this.viewprojectstatus=data[1];
        });
        contactModal.present();

  }


 cannotstartjob(random){

		let contactModal = this.modalCtrl.create('Confirmcode1Page', {random:random,order_num:this.order_num});
        contactModal.onDidDismiss(data =>{
            this.viewproject=data[0];
            //this.viewproject=data;
            this.viewprojectstatus=data[1];
        });
        contactModal.present();

  }

   dismiss()
   {
      if(this.not=='notification')
      {
            this.storage.get('userid').then((userid) => {
                this.api.post('getnotifications',{userid:userid}).subscribe((res:any) => {
                        this.notifications=res.notifications;
                        this.viewCtrl.dismiss(this.notifications);

                });
              });
      }
      else
      {
          this.storage.get('userid').then((userid) => {
            this.api.post('todayjobworkflowmangment',{userid:userid}).subscribe((res:any) => {
                this.todayjobs=res.todayjobs;
                this.viewCtrl.dismiss(this.todayjobs);

            });
          });
      }


   }

confirmcomplete(order_num)
   {

	this.storage.get('userid').then((userid) => {
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
						/*
						let loading = this.loadingCtrl.create({
						spinner:'hide',
						content: '<img src="assets/img/busy.gif">',
					  });
					  loading.present();
					  */
					  // Biplab test 1214 added on Jan 20,2020

					  this.navCtrl.push('ConfirmcodecPage',{order_num:order_num,userid:userid,cust_id:this.cust_id});

					 /*
					 this.storage.get('userid').then(userid=>{
					  this.api.post("completedthejob", { order_num:order_num,userid:userid,cust_id:this.cust_id}).subscribe((resp:any) => {
					  loading.dismiss();

							let toast = this.toastCtrl.create({
								message: 'Job completed successfully',
								duration: 3000,
								position: 'bottom'
							});
							toast.present();
							this.navCtrl.setRoot('TodayongoingjobsPage');
						});
					 });
					 */

					}
				  }
				]
			  });
			  alert.present();
			}
       }
        });
        });
   }

openAnyPage()
{
//        this.iab.create(url);

		//let destination = latitude + ',' + longitude;
		let destination = this.cust_lat + ',' + this.cust_lng;
alert('Opening Google Map App');
		//if(this.platform.is('ios')){
		//	window.open('maps://?q=' + destination, '_system');
		//} else {

			let label = encodeURI('Customer Location');
			window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system','location=yes');

		//}

	//	alert('end of ap');
		// ProviderViewprojectPage
		// this.navCtrl.setRoot('DashboardPage');
		//this.navCtrl.setRoot('ProviderViewprojectPage');



}

/*
gotomap(order_num)
{
	this.navCtrl.push('MaproutePage', {order_num:order_num});
    //this.navCtrl.setRoot('MaproutePage');

}
*/

pay(order_num,price) {
    var options = {
      description: order_num,
      //image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_uYORCNV2bfaqbO',
      amount: price,
      name: 'job',
      prefill: {
        email: 'servicesarkar18@gmail.com',
        contact: '8585880402',
        name: 'Sarkar'
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

    var successCallback = function(payment_id) {
      alert('payment_id: ' + payment_id);
    };

    var cancelCallback = function(error) {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }

// biplab test 1214 -start
   doAccept(order_num,yourprice,popupstatus)
  {

	  if(popupstatus=='true')
      {
             let contactModal = this.modalCtrl.create('AgentpopupPage', {order_num:order_num,yourprice:yourprice});
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
          this.storage.get('userid').then((userid) => {
          this.api.post("doAcceptjob", { order_num:order_num,userid:userid}).subscribe((resp:any) => {
          loading.dismiss();

		 // alert ("Status="+resp.status);

				if(resp.status=='success')
				{
					let toast = this.toastCtrl.create({
						message: 'Job Accepted',
						duration: 3000,
						position: 'bottom'
					});
					toast.present();

					this.storage.get('userid').then((userid) => {
						this.api.post('getnewleadmanagement',{userid:userid}).subscribe((res:any) => {
							  this.orderdetails=res.orderdetails;
							  this.viewCtrl.dismiss(this.orderdetails);
						});
					});

				}
				else if (resp.status=='expired')
				{
						let toast = this.toastCtrl.create({
						message: 'This lead status got changed!! please refersh your screen',
						duration: 5000,
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
  }

// Biplab end


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderViewprojectPage');
  }
  refresh_screen()
  {
      this.navCtrl.setRoot('DashboardPage',{userid:this.userid});
  }
}

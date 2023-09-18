import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ModalController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';


declare var RazorpayCheckout: any;

@IonicPage()
@Component({
  selector: 'page-viewproject',
  templateUrl: 'viewproject.html',
})
export class ViewprojectPage {
order_num:any;
viewproject:any;
nval:any;
orderdetails:any;
bid_detail:any;
pet:any;
enddate: any;
endtime: any;
	
startdate1: any;
startdate: any;
starttime: any;
showsummarysreen:any;
showpaysreen:any;
bidscreen:any;
startdateflag:any;
enddateflag:any;
viewprojectstatus:any;
providerdata:any;
sstatus:any;
name:any;
spid:any;
text:any;
fdate:any;
dattt:any;
monthh:any;
date1:any;
payments:any;
paymenttype:any;
price:any;
paystatus:any;
not_count:any;
not:any;
notifications:any;
calenderdays:any;
catid:any;
startingdate:any;
checked:any;
senddate:any;
calenderslots:any;
checkedtime:any;
agent:any;
agent_label:any;
special:any;
whatsappno:any;
popular:any;
cancel_id:any;
cancel_reason:any;
userid:any;


  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, 
  public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController, public viewCtrl: ViewController) 
  {

    this.userid=this.navParams.get('userid'); 
  /*
    this.catid=this.navParams.get('catid');
    this.not=this.navParams.get('not');
  		this.order_num=this.navParams.get('order_num');
  		this.spid=this.navParams.get('spid');
  		this.storage.get('userid').then((userid) => {
	  		this.api.post('getprojectdetails',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
	  			if(res.status=='success')
	  			{
	  				this.nval=true;
	  				this.viewproject=res.viewproject;
	  				this.viewprojectstatus=res.viewprojectstatus;
	  			}
	  		});
  	  	});

  	  	

        this.storage.get('userid').then((userid) => {
	  		this.api.post('getordercustmerdetails  ',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
            if(res.status=='agent')
            {
            this.agent='agent';
            }
            else
            {
            this.agent='provider';
            }
	  				this.orderdetails=res.orderdetails;
	  				this.providerdata=res.providerdata;
            this.agent_label=res.agent_label;
            this.special=res.special;
	  		});
	  	});

  	  	this.storage.get('userid').then((userid) => {
	  		this.api.post('getorderdetailsdt',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
	  				this.orderdetails=res.orderdetails;
			
	  		});
	  	});

	  	this.storage.get('userid').then((userid) => {
	  		this.api.post('getcustscheduledate',{userid:userid, order_num:this.order_num}).subscribe((res:any) => {
	  			this.startdate=res.scheduledata.sdate;
	  			this.starttime=res.scheduledata.stime;
	  			this.enddate=res.scheduledata.edate;
	  			this.endtime=res.scheduledata.etime;
	  			this.startdateflag=res.scheduledata.startdateflag;
	  			this.enddateflag=res.scheduledata.enddateflag;
	  		});
	  	});
	  	this.pet='order';

  
       this.storage.get('userid').then(userid=>{
        this.api.post('getnotificationscount',{userid:userid}).subscribe((res:any) => {
                  this.not_count=res.not_count;
        });  
      });

    this.api.post('getCalenderDays', {catid:this.catid}).subscribe((res:any) => {
          this.calenderdays=res.calenderdays;
          this.startingdate=res.startingdate;
          this.checked=res.weekday;
          this.senddate=res.calenderdays.senddate;
          this.api.post('getCalenderslots', {catid:this.catid,sdate:this.checked,curdate:this.startingdate}).subscribe((res:any) => {
                if(res.status=='success')
                {
                  this.calenderslots=res.calenderslots;
                  this.nval=true;
                }
                else
                {
                  this.nval=false;
                }
                
          });

    });
*/
  }

selectedDate(sdate,selecteddate)
{
  this.checked=sdate;
  this.startdate = selecteddate;

    this.api.post('getCalenderslots', {userid:this.userid,catid:this.catid,sdate:sdate,curdate:selecteddate}).subscribe((res:any) => {
          if(res.status=='success')
          {
            this.calenderslots=res.calenderslots;
            this.nval=true;
          }
          else
          {
            this.nval=false;
          }
    });
}

saveDate(slots)
{
    this.checkedtime=slots;
  this.starttime=slots;
}

  dismiss() 
   {
      if(this.not=='notification')
      {
            //this.storage.get('userid').then((userid) => {
                this.api.post('getnotifications',{userid:this.userid}).subscribe((res:any) => {
                        this.notifications=res.notifications;  
                        this.viewCtrl.dismiss(this.notifications);
                      
                });
             // });
      }
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

  govieworderPage(order_num,viewprojectstatus,jobstatus,spid)
	  {
		  let loading =  this.loadingCtrl.create({
			spinner:'hide',
			content: '<img src="assets/img/busy.gif">',
			dismissOnPageChange: true 
			//content: 'Loading Please Wait...'
			});
			loading.present();
			//loading.dismiss();
	  		this.navCtrl.push('CustvieworderPage', {userid:this.userid,order_num:order_num,viewprojectstatus:viewprojectstatus,jobstatus:jobstatus,spid:spid});
			loading.dismiss();
	  }

	  goinvoicePage(order_num)
	  {
			  let loading =  this.loadingCtrl.create({
			spinner:'hide',
			content: '<img src="assets/img/busy.gif">',
			dismissOnPageChange: true 
			//content: 'Loading Please Wait...'
			});
			loading.present();
	  		this.navCtrl.push('CustinvoicePage', {userid:this.userid,order_num:order_num});
			loading.dismiss();
	  }

    gopaymentPage(order_num)
    {
		
			let loading =  this.loadingCtrl.create({
			spinner:'hide',
			content: '<img src="assets/img/busy.gif">',
			dismissOnPageChange: true 
			//content: 'Loading Please Wait...'
			});
			loading.present();
			
       // this.storage.get('userid').then((userid) => {
                this.api.post('getpayementstatus',{userid:this.userid,order_num:order_num}).subscribe((res:any) => {
		loading.dismiss();
                      if(res.status=='success')
                      {
                          this.navCtrl.push('CustPaymentPage', {userid:this.userid,order_num:order_num});
						  
                      }
					  else
					  {
						  this.general.showToast('Payment option will be enabled after service provider assignment');
						  
					  }
                });
       // });
    }


gotoNetScreen()
{
		/*if(this.startdate=='' || this.startdate==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select Start Date',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();

	    }
	    else if(this.starttime=='' || this.starttime==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select Start Time',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();
	    }
		 
	    else if(this.enddate=='' || this.enddate==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select End Date',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();

	    }
	    else if(this.endtime=='' || this.endtime==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select End Time',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();
	    }
	    else
	    { */
	    	let loading =  this.loadingCtrl.create({
			spinner:'hide',
			content: '<img src="assets/img/busy.gif">',
			dismissOnPageChange: true 
			//content: 'Loading Please Wait...'
			});
			loading.present();
			

				 // this.storage.get('userid').then(userid=>{
				    this.api.post('custsaveresheduledata', { userid:this.userid, startdate:this.startdate,starttime:this.starttime,order_num:this.order_num }).subscribe((res:any) => {


				    if(res.status=='success')
				    {
				        let toast = this.toastCtrl.create({
				            message: 'Reschedule success',
				            duration: 3000,
				            position: 'bottom'
				        });
				        toast.present();
						//this.storage.get('userid').then((userid) => {
						this.api.post('getprojectdetails',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
						if(res.status=='success')
						{
							this.nval=true;
							this.viewproject=res.viewproject;
							this.viewprojectstatus=res.viewprojectstatus;
						}
							});
						//});
				    }
				    
				    });
				  //});
loading.dismiss();
		//}
}


/*calltoProvider(phonenumber)
{
	this.callNumber.callNumber(phonenumber, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}*/

doCanceljob(order_num)
{

	
  	let alert = this.alertCtrl.create({
    title: 'Reschedule or Cancel?',
    message: 'Do you want to Reschedule this job instead of cancel ?',
    buttons: [
      {
        text: 'Reschedule',
        role: 'Reschedule',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Cancel',
        handler: () => {


  //-------------------------------------------------------------------
  if(this.cancel_id=='' || this.cancel_id==undefined)
      {
          let toast = this.toastCtrl.create({
              message: 'Select Reason for Cancellation',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
	  }
      else
      {

  
  
 // ------------------------------------------------------------------
 
    let alert = this.alertCtrl.create({
    title: 'are you sure you want to cancel this Job?  Click Ok to Proceed',
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
			
		let loading = this.loadingCtrl.create({
		spinner:'hide',
		content: '<img src="assets/img/busy.gif">',
		dismissOnPageChange: true 
		});
		loading.present();
		  
					//this.storage.get('userid').then(userid=>{
						 this.api.post("cancelOrder_cust", { order_num:order_num,userid:this.userid,cancel_id:this.cancel_id,cancel_reason:this.cancel_reason}).subscribe((res1:any) => {
						loading.dismiss();
								 if(res1.status=='success')
                                  {
                                       let toast = this.toastCtrl.create({
                                              message: 'Your Job Cancelled successfully ',
                                              duration: 3000,
                                              position: 'bottom'
                                          });
                                          toast.present();
                                          // biplab phase2 0729 - back to invoice screen after received the payment
										  //this.navCtrl.push('ProviderInvoicePage', {order_num:order_num});
										  this.navCtrl.push('JobhistoryPage',{userid:this.userid});


                                   }
                            });
						//});
        }
      }
    ]
  });
  alert.present(); 
	}
	}
	}
	    ]
  });
  alert.present(); 
 
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

  awardtheBid(stat)
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
                if(stat=='agent')
                {
                      this.order_num=this.navParams.get('order_num');
                       // this.storage.get('userid').then((userid) => {
                          this.api.post('saveagentbid',{userid:this.name, order_num:this.order_num, provider:this.name}).subscribe((res:any) => {
                            if(res.status=='success')
                            {
                                let toast = this.toastCtrl.create({
                                      message: 'Bid alloted to selected provider successfully',
                                      duration: 3000,
                                      position: 'bottom'
                                  });
                                  toast.present();

                                  this.sstatus='hide';

                               // this.storage.get('userid').then((userid) => {
                                    this.api.post('getprojectdetails',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
                                      if(res.status=='success')
                                      {
                                        this.nval=true;
                                        this.viewproject=res.viewproject;
                                        this.viewprojectstatus=res.viewprojectstatus;
                                      }
                                    });
                                  //});
                                 // this.storage.get('userid').then((userid) => {
                                        this.api.post('getordercustmerdetails',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
                                              if(res.status=='agent')
                                              {
                                              this.agent='agent';
                                              }
                                              else
                                              {
                                              this.agent='provider';
                                              }
                                              this.orderdetails=res.orderdetails;
                                              this.providerdata=res.providerdata;
                                              this.agent_label=res.agent_label;
                                              this.special=res.special;
											  
											  
                                        });
                                  //});

                            }

                            //this.navCtrl.setRoot('OngoingjobsPage');

                        });
                     // });
                }
                else
                {
                      this.order_num=this.navParams.get('order_num');
                       // this.storage.get('userid').then((userid) => {
                          this.api.post('saveproviderbid',{userid:this.name, order_num:this.order_num, provider:this.name}).subscribe((res:any) => {
                            if(res.status=='success')
                            {
                                let toast = this.toastCtrl.create({
                                      message: 'Bid alloted to selected provider successfully',
                                      duration: 3000,
                                      position: 'bottom'
                                  });
                                  toast.present();
                                  this.sstatus='hide';
                                 // this.storage.get('userid').then((userid) => {
                                    this.api.post('getprojectdetails',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
                                      if(res.status=='success')
                                      {
                                        this.nval=true;
                                        this.viewproject=res.viewproject;
                                        this.viewprojectstatus=res.viewprojectstatus;
                                      }
                                    });
                                 // });
                                 // this.storage.get('userid').then((userid) => {
                                        this.api.post('getordercustmerdetails  ',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
                                              if(res.status=='agent')
                                              {
                                              this.agent='agent';
                                              }
                                              else
                                              {
                                              this.agent='provider';
                                              }
                                              this.orderdetails=res.orderdetails;
                                              this.providerdata=res.providerdata;
                                              this.agent_label=res.agent_label;
                                              this.special=res.special;

								  
								  
                                        });
                                  //});
                            }

                            //this.navCtrl.setRoot('OngoingjobsPage');

                        });
                     // });
              }

            }
      
  }


  goReview(order_num,spid)
  {
  	let contactModal = this.modalCtrl.create('ReviewratingPage', {userid:this.userid,order_num:this.order_num,spid:spid});
        contactModal.onDidDismiss(data =>{ 
        });
        contactModal.present();
  }

  goReviewforagency(order_num,spid)
  {
    let contactModal = this.modalCtrl.create('AgenceyreviewPage', {userid:this.userid,order_num:this.order_num,spid:spid});
        contactModal.onDidDismiss(data =>{ 
        });
        contactModal.present();
  }

  goAgentReview(order_num,spid,catid)
  {
     // let contactModal = this.modalCtrl.create('AgentreviewratingPage', {order_num:this.order_num,spid:spid,catid:catid});
	 let contactModal = this.modalCtrl.create('AgenceyreviewPage', {userid:this.userid,order_num:this.order_num,spid:spid});
        contactModal.onDidDismiss(data =>{ 
        });
        contactModal.present();
  }
  goDetails(order_num,proid)
  {
  		this.navCtrl.push('ProviderviewleadPage', {userid:this.userid,order_num:order_num,proid:proid});
  }

   awardClose()
  {
  this.sstatus='hide';
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

                  this.sstatus='hide';
            }
            else
            {
                    if(this.paymenttype=='1')
                    {
                            this.api.post('dopayment',{userid:this.userid,order_num:order_num, price:this.price,paymenttype:this.paymenttype}).subscribe((res:any) => {
                                  if(res.status=='success')
                                  {
                                       let toast = this.toastCtrl.create({
                                              message: 'Payment successfully updated',
                                              duration: 3000,
                                              position: 'bottom'
                                          });
                                          toast.present();
                                  }
                            });
                    }
                    else if(this.paymenttype=='2')
                    {
                            this.api.post('dopayment',{userid:this.userid,order_num:order_num, price:this.price,paymenttype:this.paymenttype}).subscribe((res:any) => {
                                  if(res.status=='success')
                                  {
                                       let toast = this.toastCtrl.create({
                                              message: 'Payment successfully updated',
                                              duration: 3000,
                                              position: 'bottom'
                                          });
                                          toast.present();
                                  }
                            });
                    }
                    else if(this.paymenttype=='3')
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
                                    alert('dismissed')
                                  }
                                }
                              };
                              let me = this;
                              var successCallback = function(payment_id) {
                                //alert('payment_id: ' + payment_id);
                                  
                                  me.api.post('dopayment',{userid:this.userid,order_num:order_num, price:me.price,paymenttype:me.paymenttype}).subscribe((res:any) => {
                                  if(res.status=='success')
                                  {
                                       let toast = me.toastCtrl.create({
                                              message: 'Payment successfully updated',
                                              duration: 3000,
                                              position: 'bottom'
                                          });
                                          toast.present();
                                  }
                            });

                                   /*me.navCtrl.push("CustPaymentPage",{order_num:me.order_num, price:me.price,paymenttype:me.paymenttype}); */
                              };

                              var cancelCallback = function(error) {
                                alert(error.description + ' (Error ' + error.code + ')');
                              };
                              RazorpayCheckout.open(options, successCallback, cancelCallback);
                    }
            }
}

  pay(order_num,price) {
  let amount = price+'00';
    var options = {
      description: order_num,
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


updateCucumber(cancel_id,cancel_reason)
{
  this.cancel_reason='';
  this.cancel_id=cancel_id;
  this.cancel_reason=cancel_reason;
}

ionViewWillEnter() {
	//  ionViewDidLoad() {
	  
	 // this.general.showLoading();
	  
	let loading =  this.loadingCtrl.create({
	spinner:'hide',
	content: '<img src="assets/img/busy.gif">',
	//dismissOnPageChange: true 
	//content: 'Loading Please Wait...'
	});
	loading.present();

	  
	    this.catid=this.navParams.get('catid');
		this.not=this.navParams.get('not');
  		this.order_num=this.navParams.get('order_num');
  		this.spid=this.navParams.get('spid');
      this.userid=this.navParams.get('userid'); 
		
		//this.userid=this.navParams.get('userid');
		
  		//this.storage.get('userid').then((userid) => {
	  		this.api.post('getprojectdetails',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
	  			if(res.status=='success')
	  			{
	  				this.nval=true;
	  				this.viewproject=res.viewproject;
	  				this.viewprojectstatus=res.viewprojectstatus;
	  			}
	  		});
  	  //	});
 	  	

  	  //	this.storage.get('userid').then((userid) => {
	  		this.api.post('getorderdetailsdt',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
	  				this.orderdetails=res.orderdetails;
			
	  		});
	  //	});

	  //	this.storage.get('userid').then((userid) => {
	  		this.api.post('getcustscheduledate',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
	  			this.startdate=res.scheduledata.sdate;
	  			this.starttime=res.scheduledata.stime;
	  			this.enddate=res.scheduledata.edate;
	  			this.endtime=res.scheduledata.etime;
	  			this.startdateflag=res.scheduledata.startdateflag;
	  			this.enddateflag=res.scheduledata.enddateflag;
	  		});
			
			// added by biplab Apr08 2020
			//this.storage.get('userid').then((userid) => {
				this.api.post("cancelreason", { userid:this.userid}).subscribe((resp:any) => {
				this.popular=resp.popular;
				});
			//});
			
loading.dismiss();
	  //	});
	  	this.pet='order';
//loading.dismiss();
  /*
       this.storage.get('userid').then(userid=>{
        this.api.post('getnotificationscount',{userid:userid}).subscribe((res:any) => {
                  this.not_count=res.not_count;
        });  
      });
	*/
	
//alert('hahaha');

   //     this.storage.get('userid').then((userid) => {
	  		this.api.post('getordercustmerdetails  ',{userid:this.userid, order_num:this.order_num}).subscribe((res:any) => {
//alert('jajaahaha');				
//alert('res_status='+res.status);				
            if(res.status=='agent')
            {
            this.agent='agent';
            }
            else
            {
            this.agent='provider';
            }
			
			this.orderdetails=res.orderdetails;
			this.providerdata=res.providerdata;
			this.agent_label=res.agent_label;
			this.special=res.special;
					
					
//alert('Agent_label='+this.agent_label);
					
					
	  		});
	  //	});
		
    this.api.post('getCalenderDays', {userid:this.userid,catid:this.catid}).subscribe((res:any) => {
          this.calenderdays=res.calenderdays;
          this.startingdate=res.startingdate;
          this.checked=res.weekday;
          this.senddate=res.calenderdays.senddate;
		  
		  
          this.api.post('getCalenderslots', {userid:this.userid,catid:this.catid,sdate:this.checked,curdate:this.startingdate}).subscribe((res:any) => {
			if(res.status=='success')
			{
			  this.calenderslots=res.calenderslots;
			  this.nval=true;
			}
			else
			{
			  this.nval=false;
			}
                
          });

    });
	
	
	// added on Apr04 20202
	       // this.storage.get('userid').then((userid) => {
          this.api.post('get_ccnumber',{userid:this.userid}).subscribe((res2:any) => {
                 // this.ccnumber=res2.ccnumber;
				 // this.ref1=res2.ref1;
				  this.whatsappno=res2.whatsappno;
          });
       // });
	
	
	

  //  console.log('ionViewDidLoad ViewprojectPage');
  }

}

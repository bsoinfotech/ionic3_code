import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ModalController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {
out_data:any;
pending_leads:any;
comm:any;
total_comm_cr:any;
total_comm_dr:any;
total_comm_net:any;
min_trans_amt:any;
pending_amt:any;

promoinfo:any;
title:any;
showtitle:any;
showpromosection:any;



  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController,private socialSharing: SocialSharing, public modalCtrl: ModalController) {

      this.storage.get('userid').then((userid) => {
          this.api.post('summaryscreen1',{userid:userid}).subscribe((res:any) => {
                  this.out_data=res.out_data;
				  // biplab test 1214
				  this.pending_leads=res.pending_leads;
          this.comm=res.comm;
          this.total_comm_cr=res.total_comm_cr;
          this.total_comm_dr=res.total_comm_dr;
          this.total_comm_net=res.total_comm_net;
          this.min_trans_amt= res.min_trans_amt;
          this.pending_amt=res.pending_amt;

          });
        });
//-------------------------------
this.storage.get('userid').then(userid=>{
  this.api.post('getusercoupon',{userid:userid}).subscribe((res:any) => {
    if(res.status=='success')
    {
    //  this.not_count=res.not_count;

        this.promoinfo=res.promoinfo;
        this.title=res.title;
        this.showtitle=res.showtitle;
        this.showpromosection = res.showpromosection;
      // this.scatname=res.scatname;

    }
  });



});



//--------------------------------


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
	  		this.navCtrl.push('CustvieworderPage', {order_num:order_num,viewprojectstatus:viewprojectstatus,jobstatus:jobstatus,spid:spid});
			loading.dismiss();
	  }
  goPopuppage(){

  let contactModal = this.modalCtrl.create('CustomercarePage');
        contactModal.onDidDismiss(data =>{
        });
        contactModal.present();
  }

  gopromopage(promo_code)
  {
    let loading =  this.loadingCtrl.create({
    spinner:'hide',
    content: '<img src="assets/img/busy.gif">',
    });
    loading.present();
  //  this.general.showToast(res.msg);
    this.navCtrl.push('PromoPage', {promo_code:promo_code});
    loading.dismiss();
  }

  getbankscreen(total_comm_net,min_trans_amt,pending_amt)
  {

    //    alert ('credit='+total_comm_net+'  min_bal='+min_trans_amt);
    //  alert('xx='+this.catinfo[i].id);

    if (total_comm_net>=min_trans_amt)
    {
      this.navCtrl.push('BankdetailsPage',{total_comm_net:total_comm_net,pending_amt:pending_amt});
    }
    else
    {
      let toast = this.toastCtrl.create({
          message: 'Your balance credit should be >= Rs.'+min_trans_amt+' to transfer to your bank account',
          duration: 6000,
          position: 'bottom'
        });
        toast.present();

    }
  }
  gopageOut1()
  {
    this.navCtrl.push('Teamscreen6Page');
  }
  gopageOut3(pag)
  {
    this.navCtrl.push('Teamscreen3Page', {pag:pag});
  }
  gopageOut5(pag)
  {
  	this.navCtrl.push('Teamscreen5Page',{pag:pag});
  }

  gopageOut7()
  {
  	this.navCtrl.push('Teamscreen4Page');
  }

  goNextpage(page)
{
    this.navCtrl.setRoot(page);
}

 shareInfo(referalcode,price)
{
    this.navCtrl.push('SocialsharePage',{referalcode:referalcode,price:price});
}


 /*shareInfo(referalcode,price)
    {
      this.storage.get('userid').then((userid) => {
        let text = "Please use invitation code= "+userid+" to install Service Sarkar Apps ";

        this.socialSharing.share(text, "Service Sarkar Apps for your service,shopping and business. Please refer & earn forever", "https://bsoinfotech.com/servicefinder/logo.png", "https://play.google.com/store?hl=en").then(() => {
        //alert("Sharing success");
            // Success!
        }).catch(() => {
            // Error!
        //alert("Share failed");
        });
    });
    }
*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamPage');
  }

}

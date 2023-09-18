import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ModalController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-socialshare',
  templateUrl: 'socialshare.html',
})
export class SocialsharePage {
	userid:any;
	referalcode:any;
	price:any;
	usertype:any;
	apklink:any;
	msg:any;
  ssterms:any;
  custcomm:any;
  showcomm:any;
    title:any;
    title1:any;
    title2:any;
    title3:any;
    title4:any;
    title5:any;
    title6:any;
    page_image:any;

	//refcode:  title:any;any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController,private socialSharing: SocialSharing, public modalCtrl: ModalController) {
  		 this.referalcode=this.navParams.get('referalcode');
  		 this.price=this.navParams.get('price');

  		 this.storage.get('userid').then((userid) => {
  		 		this.userid=userid;

		  this.api.post('get_usertype',{userid:userid}).subscribe((res1:any) => {
            if(res1.status=='success')
            {

              this.usertype=res1.usertype;
            }
            else
            {
				this.usertype='';
            }
			});
		// get reference msg and apk link  added on Dec 2020
		this.api.post('get_apklink',{userid:userid}).subscribe((res2:any) => {
			this.apklink=res2.apklink;
			this.msg = res2.msg;
      this.page_image = res2.page_image;
		});
		//-----added on Dec 2020 end
    // get cust supervisor commision-- added on Dec 2020
		this.api.post('getcustsupcomm',{userid:userid}).subscribe((res2:any) => {
			this.custcomm=res2.custcomm;
			this.showcomm = res2.showcomm;
      this.ssterms =res2.ssterms;
      this.title = res2.title;
      this.title1 = res2.title1;
      this.title2 = res2.title2;
      this.title3 = res2.title3;
      this.title4 = res2.title4;
      this.title5 = res2.title5;
        this.title6 = res2.title6;
		});
		//-----added on Dec 2020 end



  		 });
		 ///added by biplab phase2 0819
		 /*      this.storage.get('userid').then((userid) => {
          this.api.post('get_refcode',{userid:userid}).subscribe((res1:any) => {
            if(res1.status=='success')
            {

              this.refcode=res1.refcode;
            }
            else
            {
				this.refcode='0';
            }
          });
        });
		*/
		/////
  }
  gotoBack()
  {
		if (this.usertype=='c')
		{
			this.navCtrl.setRoot('JobPage');
		}
		if (this.usertype=='p')
		{
			this.navCtrl.setRoot('DashboardPage');
		}
  }

  shareInfo(referalcode,price)
    {
      let loading =  this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
      //dismissOnPageChange: true
      duration: 6000
      });
      loading.present();

	    this.storage.get('userid').then((userid) => {
    //    let text = "Get your service done thru Service Sarkar, Please use invitation code= "+userid+" to install Service Sarkar Apps ";
	   //let text = this.msg;
	   //this.apklink= "https://play.google.com/store/apps/details?id=com.servicesarkar.servicesarkar";

	   //"Hey, have you tried Service Sarkar? The Ultimate Service Provider for your Home appliences,Home Cleaning,Desktop/Laptop and many more. I have recently took service from them and thought you might like it too! Sign up and book your order. You will *get Rs 100 off *on your first service. https://play.google.com/store/apps/details?id=com.servicesarkar.servicesarkar";

      this.socialSharing.share(this.msg, "BsoApp for doorstep service. Please refer & earn forever",
      "https://bsoinfotech.com/servicefinder/uploads/ss_share.jpg",
      this.apklink).then(() => {
      //alert("Sharing success");
      // Success!
      }).catch(() => {
      // Error!
      //alert("Share failed");
      });
    });
    loading.dismiss();

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialsharePage');
  }

  goNextpage(page)
  {

  if (page=='TeamPage')

    {

      this.storage.get('userid').then(userid=>{

      this.api.post('getteamaccess',{userid:userid}).subscribe((res:any) => {

             if(res.status=='success')
                   {
            let loading =  this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
            //dismissOnPageChange: true
            //duration: 1000
            });
            loading.present();

            this.navCtrl.push(page);

            loading.dismiss();

                   }
                   else
                   {

                        this.general.showToast('This is not enable for you');

                   }



      });
    });
    }
    else
    {

      let loading =  this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
      //dismissOnPageChange: true
      //duration: 1000
      });
      loading.present();

      this.navCtrl.push(page);

      loading.dismiss();
    }



  }

}

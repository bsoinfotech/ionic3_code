import { Component } from '@angular/core';
import { IonicPage, App,Platform,NavController, NavParams, ModalController ,ToastController,LoadingController,AlertController} from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { AppMinimize } from '@ionic-native/app-minimize';
///////////////
//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';  //biplab ma
//import { NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

//import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
@IonicPage()
@Component({
  selector: 'page-job',
  templateUrl: 'job.html',
})
export class JobPage {
banners:any;
userid:any;
email:any;
categories:any;
not_count:any;
location:any;
subThoroughfare:any;
thoroughfare:any;
sublocation:any;
postalcode:any;
area:any;
adminarea:any;
country:any;
/////////////////////////////
  isOffline: boolean;
  connected: Subscription;
  disconnected: Subscription;
///////////////////////////////////
	customernote:any;
	catinfo:any;
	id:any;
	image:any;
	scids:any;
  showrefer:any;
  jobimage:any;
  popup:any;
  ssrating:any;
  adslist:any;
  currentdeals:any;
  showsspromise:any;
  promiseimage:any;
  cstory:any;

  order_num:any;
  cat_id:any;
  promoinfo:any;
  title:any;
  showtitle:any;
  showpromosection:any;
  ssphone:any;
  teamaccess:any;

  constructor(public navCtrl: NavController,public user: User,public general: General,public api: Api,
  public navParams: NavParams,private storage: Storage, public modalCtrl: ModalController,
  private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,
  public loadingCtrl: LoadingController,private network: Network,public toastCtrl: ToastController,
  private ConnectivityServiceProvider:ConnectivityServiceProvider,
  private alertCtrl: AlertController,
  private appMinimize: AppMinimize,public  app: App,private platform: Platform
  )

  {

		this.banners=this.navParams.get('banners');
		this.location=this.navParams.get('location');
		this.categories=this.navParams.get('categories');
    this.teamaccess=this.navParams.get('teamaccess');

    this.showrefer=this.navParams.get('showrefer');
		this.jobimage=this.navParams.get('jobimage');
		this.adslist=this.navParams.get('adslist');
    this.currentdeals=this.navParams.get('currentdeals');

    this.showsspromise=this.navParams.get('showsspromise');
		this.promiseimage=this.navParams.get('promiseimage');
		this.cstory=this.navParams.get('cstory');
    this.ssphone=this.navParams.get('ssphone');

        this.storage.get('userid').then(userid=>{
           this.userid=userid;
        });
        this.storage.get('email').then(email=>{
           this.email=email;
		   });





  }



  ionViewDidLoad() {
//this.general.showLoading();


		let loading =  this.loadingCtrl.create({
		spinner:'hide',
		content: '<img src="assets/img/busy.gif">',
		//dismissOnPageChange: true
		//content: 'Loading Please Wait...'
		});
		 loading.present();


if (this.location==undefined)
{
		this.storage.get('userid').then(userid=>{
        this.api.post('checkuseraddress',{userid:userid}).subscribe((res:any) => {

        if(res.status=='success')
        {
            this.location=res.location;
        }
        else
        {

			this.geolocation.getCurrentPosition().then((resp) => {
              let options: NativeGeocoderOptions = {
                            useLocale: true,
                            maxResults: 5
                        };
                    this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options).then((result: NativeGeocoderReverseResult[]) =>{

                    if(result[0].subThoroughfare!=undefined)
                    {
                        this.subThoroughfare=result[0].subThoroughfare+", ";
                    }
                    else
                    {
                        this.subThoroughfare='';
                    }

                    if(result[0].thoroughfare!=undefined)
                    {
                        this.thoroughfare=result[0].thoroughfare+", ";
                    }
                    else
                    {
                        this.thoroughfare='';
                    }



                    if(result[0].locality!=undefined)
                    {
                        this.location=result[0].locality+", ";
                    }
                    else
                    {
                        this.location='';
                    }
                    if(result[0].subLocality!=undefined)
                    {
                        this.sublocation=result[0].subLocality+", ";
                    }
                    else
                    {
                      this.sublocation='';
                    }

                    if(result[0].subAdministrativeArea!=undefined)
                    {
                        this.area=result[0].subAdministrativeArea+", ";
                    }
                    else
                    {
                        this.area='';
                    }

                    if(result[0].postalCode!=undefined)
                    {
                        this.postalcode=result[0].postalCode+", ";
                    }
                    else
                    {
                        this.postalcode='';
                    }
                    if(result[0].administrativeArea!=undefined)
                    {
                      this.adminarea=result[0].administrativeArea+", ";
                    }
                    else
                    {
                      this.adminarea='';
                    }
                    if(result[0].countryName!=undefined)
                    {
                      this.country=result[0].countryName+", ";
                    }
                    else
                    {
                      this.country='';
                    }
                    //biplab phase2 subThoroughfare added on 0822
                        this.location=this.subThoroughfare+""+this.thoroughfare+""+this.sublocation+""+this.location+""+this.area+""+this.adminarea+""+this.country+""+this.postalcode;

						this.storage.get('userid').then(userid=>{

//alert('User_id='+this.userid+' Location='+this.location);

						//this.api.get('save_address',{userid:this.userid,location:this.location}).subscribe((res:any) => {
						this.api.post('save_address',{userid:this.userid,location:this.location}).subscribe((res:any) => {


						if(res.status=='success')
						{
							//this.general.showToast(res.msg);
							//alert(res.msg);
							//alert('value='+res.value);
						}
						});
					});

                    });
                }).catch((error) => {
                  console.log('Error getting location', error);
                });
           }
      });
   });
}

	////////////////////////////////////////////////////////////////////////////

	  if(this.banners==undefined)
	   {
               this.api.get('getHomeInfo').subscribe((res:any) => {

                   if(res.status=='success')
                   {
                      this.banners=res.banners;
                      this.categories=res.categories;
                      this.showrefer=res.showrefer;
                      this.jobimage=res.jobimage;
                      this.adslist=res.adslist;
                      this.currentdeals = res.currentdeals;
                      this.showsspromise=res.showsspromise;
                      this.promiseimage= res.promiseimage;
                      this.cstory=res.cstory;
                      this.ssphone = res.ssphone;

// this.general.hideLoading();

                   }
                   else
                   {
//this.general.hideLoading();
                        this.general.showToast(res.message);

                   }
               });

			//loading.dismiss();
	   }

	   loading.dismiss();



		this.storage.get('userid').then(userid=>{
			this.api.post('getnotificationscount',{userid:userid}).subscribe((res:any) => {
			this.not_count=res.not_count;
			});



		});

    this.storage.get('userid').then(userid=>{
      this.api.post('getcoupon',{userid:userid}).subscribe((res:any) => {
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

    //------------------------------------

    //check blank email and pin Code
    this.storage.get('userid').then(userid=>{
        this.api.post('chkmissinginfo',{userid:userid}).subscribe((res:any) => {
        if (res.showpage == 1)
        {
          let profileModal = this.modalCtrl.create('MissinfoPage',{action:res.action,msg:res.msg,userid:userid,chk_email:res.chk_email,chk_pin:res.chk_pin,label1:res.label1,label2:res.label2,label3:res.label3});
          profileModal.present();
        }

        });
    });

    // call popup screen
    this.storage.get('userid').then(userid=>{
      this.api.post('popvalinvoice',{userid:userid,user_type:'c'}).subscribe((res123:any) => {
      if (res123.status=='success')
      {

        if (res123.ref1==1 && res123.order_num>0)
        {
          let profileModal = this.modalCtrl.create('ValinvoicePage',{
          //	this.navCtrl.push('ValinvoicePage',{
            order_num:res123.order_num,
            output0:res123.output0,
            output1:res123.output1,
            output2:res123.output2,
            output3:res123.output3,
            output4:res123.output4,
            output5:res123.output5,
            output6:res123.output6,
            output7:res123.output7,
              spid:res123.spid,
            output8:res123.output8,
            output9:res123.output9,
            output10:res123.output10

          });
            profileModal.present();

        }
        /*
        if (res123.ref2==1 && es123.order_num>0 && res123.showrating==0)
        {
          let contactModal = this.modalCtrl.create('ReviewratingPage', {order_num:res123.order_num,spid:res123.spid});
              contactModal.onDidDismiss(data =>{
              });
              contactModal.present();
        }
        */


    }
      });
    });

    this.storage.get('userid').then(userid=>{


        this.api.post('getapps_rating',{userid:userid}).subscribe((res:any) => {

        if (res.ssrating == 1)
        {
          let profileModal = this.modalCtrl.create('AppsratingPage',{order_num:res.order_num,status:res.status,sms2:res.sms2,sms3:res.sms3,link:res.link});
          profileModal.present();
        }

        });
    });

  }

gotoSubCat(scid,ref,status,epoint)
	{

		let loading =  this.loadingCtrl.create({
		spinner:'hide',
		content: '<img src="assets/img/busy.gif">'
		//dismissOnPageChange: true
		//content: 'Loading Please Wait...'
		});
		 loading.present();



		//this.general.showToast('scid value ='+scid);
		this.scids=scid;

			if(ref=='1' && status=='1')

			{

				this.navCtrl.push('CustomernotePage',{ scatid: scid });

				/*
				   this.api.post('getcustomernote',{ scid: this.scids }).subscribe((res:any) => {
//loading.dismiss();

                   if(res.status=='success')
                   {
						this.customernote=res.subcatinfo;
						this.catinfo=res.catinfo;
						this.id=res.id;
						this.image=res.image;
						this.navCtrl.push('CustomernotePage',{ scatid: scid ,customernote:this.customernote,
															catinfo:this.catinfo,id:this.id,image:this.image});
						//loading.dismiss();
                    //   this.general.hideLoading();

                   }

               });

			   */


			}
			else
			{
			this.navCtrl.push('ListMasterPage',{ scatid: scid });
			//loading.dismiss();
			}

			loading.dismiss();
	}

  refer()
  {
    this.navCtrl.push('SocialsharePage');
  }

  getscreen1(page,input1,input2,input3,input4)
  {

    if (page=='CustomernotePage')
    {
      this.navCtrl.push('CustomernotePage',{ scatid: input1 });
    }

    if (page=='ListMasterPage')
    {
      this.navCtrl.push(page,{ scatid: input1 });
    }

    if (page=='Serviceandrepair1Page')
    {

      this.navCtrl.push(page,{ scatid: input1,catid:input2 });
    }
    if (page=='Serviceandrepair2Page')
    {
      this.navCtrl.push(page,{scatid : input1,catid:input2,subcat_level:0});
    }


  }

	gotoSearch()
	{
		this.navCtrl.push('SearchPage');
    //this.navCtrl.push('JobPage');
	}

  buycoupon(promo_code,package_id)
  {
  	if(package_id==''||package_id=='0' || package_id==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Coupon Purchase not available now',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }
    else
    {
    	this.navCtrl.push('CustcouponbuyPage',{promo_code:promo_code,package:package_id});
    }

  }

	gotoNotification()
	{


	let contactModal = this.modalCtrl.create('CustnotificationPage');
					contactModal.onDidDismiss(data =>{

						this.not_count=data;
					});
					contactModal.present();
	}

	goNextpage(page)
	{

    let loading =  this.loadingCtrl.create({
    spinner:'hide',
    content: '<img src="assets/img/busy.gif">',
    //dismissOnPageChange: true
    duration: 1000
    });
    loading.present();

	if (page=='TeamPage')

		{

//alert ('teamaccess='+this.teamaccess);
          if (this.teamaccess==undefined)
          {
            this.storage.get('userid').then(userid=>{
            this.api.post('getteamaccess',{userid:userid}).subscribe((res:any) => {

                  if(res.status=='success')
                  {
                        this.teamaccess=1;
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
                        this.teamaccess=0;
                        this.general.showToast('This is not enable for you');
                  }
                });
            });

          }
          else if (this.teamaccess=='1')
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

  checkpromoorder()
	{
    this.storage.get('userid').then(userid=>{
    this.api.post('getpromoorder',{userid:userid}).subscribe((res:any) => {
           if(res.promoordercount=='1')
          {
              let loading =  this.loadingCtrl.create({
              spinner:'hide',
              content: '<img src="assets/img/busy.gif">',
              });
              loading.present();
              this.general.showToast(res.msg);
              this.navCtrl.push('CustPaymentPage', {order_num:res.order_num,order_desc:res.order_desc});
              loading.dismiss();
          }
          else if (res.promoordercount=='0')
          {
              this.general.showToast(res.msg);
          }
          else if (res.promoordercount>1)
          {
            this.navCtrl.push('SelpromoorderPage', {promo_code:''});
            //  this.general.showToast(res.msg);
          }
      });
    });
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
	//biplab phase2 0903
	custsetaddress()
	{
	//this.navCtrl.push('customeraddressPage');
	}
	///-------------------------------------------
	gotoNetScreen(catid)
{
			//this.navCtrl.push('Customeraddress1Page');

}

	///-----------------------------------------

exitapp()
{
        let alert = this.alertCtrl.create({
          title: 'Exit?',
          message: 'Do you want to exit?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                alert =null;
              }
            },
            {
              text: 'Exit',
              handler: () => {
                this.platform.exitApp();
              }
            }
          ]
        });
        alert.present();

  }


}

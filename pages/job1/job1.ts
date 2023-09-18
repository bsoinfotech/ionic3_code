import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController ,ToastController,LoadingController,AlertController} from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
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
  selector: 'page-job1',
  templateUrl: 'job1.html',
})
export class Job1Page {
banners:any;
user_id:any;
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


  constructor(public navCtrl: NavController,public user: User,public general: General,public api: Api,
  public navParams: NavParams,private storage: Storage, public modalCtrl: ModalController,
  private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,
  public loadingCtrl: LoadingController,private network: Network,public toastCtrl: ToastController,
  private ConnectivityServiceProvider:ConnectivityServiceProvider,
  private alertCtrl: AlertController
  )

  {

		//this.banners=this.navParams.get('banners');
	//	this.location=this.navParams.get('location');
		this.user_id=this.navParams.get('userid');


      //  this.storage.get('userid').then(userid=>{
       //    this.userid=userid;
      //  });
     //   this.storage.get('email').then(email=>{
      //     this.email=email;
	//	   });

		//this.storage.get('userid').then(userid=>{



		   this.api.post('getcatinfo',{userid:this.user_id}).subscribe((resx:any) => {

		   if(resx.status=='success')
		   {
			 // this.banners=res.banners;
			  this.categories=resx.categories;

		   }
		   else
		   {
				this.general.showToast(resx.message);

		   }
		});

		//});



  }



  ionViewDidLoad() {
//this.general.showLoading();

	/*
		let loading =  this.loadingCtrl.create({
		spinner:'hide',
		content: '<img src="assets/img/busy.gif">',
		//dismissOnPageChange: true
		//content: 'Loading Please Wait...'
		});
		 loading.present();


	////////////////////////////////////////////////////////////////////////////


		this.storage.get('userid').then(userid=>{

			//alert('hahah='+this.userid);

			       this.api.get('getHomeInfo1',{user_id:this.userid}).subscribe((res:any) => {

                   if(res.status=='success')
                   {
                     // this.banners=res.banners;
                      this.categories=res.categories;

                   }
                   else
                   {
                        this.general.showToast(res.message);

                   }
               });

        });


	   loading.dismiss();


*/

  }

  checkpartscost(userid,catid)
  {



  				let loading = this.loadingCtrl.create({
  				spinner:'hide',
  				content: '<img src="assets/img/busy.gif">',
  				//dismissOnPageChange: true
  				//content: 'Loading Please Wait...'
  				});
  				loading.present();

  				//this.navCtrl.setRoot('DashboardPage');
  				//this.navCtrl.push('DashboardPage');
  				this.navCtrl.push('PartsdtlPage',{userid:userid,catid:catid});
  				loading.dismiss();




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

		this.navCtrl.push('ListMaster1Page',{ scatid: scid ,userid:this.user_id});

			loading.dismiss();
	}



	goNextpage(page)
	{

		/*
		if (this.network.type === 'none' )
		{

			//alert('Either No Network Connection OR Very Poor Network Connection!..Please Check your network and try again');
			//return true;
			this.general.showToast('Please Check your network connection');

		}
		*/
		//else
		//{
			let loading =  this.loadingCtrl.create({
			spinner:'hide',
			content: '<img src="assets/img/busy.gif">',
			//dismissOnPageChange: true
			//duration: 1000
			});
			loading.present();


			this.navCtrl.push(page);
			//this.general.showToast('This is not enable for you');

			//alert('hahaha');

			loading.dismiss();

		//}

	}

	///-------------------------------------------
	gotoNetScreen(catid)
{
			//this.navCtrl.push('Customeraddress1Page');

}

	///-----------------------------------------

}

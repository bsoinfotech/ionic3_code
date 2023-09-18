import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { User,Api,General } from '../../providers';
import { Network } from '@ionic-native/network';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

import { Geofence } from '@ionic-native/geofence';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';

//import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

@IonicPage()
@Component({
  selector: 'page-customeraddress',
  templateUrl: 'customeraddress.html',
})
export class CustomeraddressPage {
 email: any;
useraddress:any;
showaddress:any;
address: {userid : any} =
  {
     userid: ''
  };
  delete: {addid : any, userid : any} =
  {
     addid: '',
     userid: ''
  };

  lng:any;
  lat:any;
  //biplab phase2
  id:any;
  customeraddress:any;
  catstatus:any;
  startscreen:any;
  endscreen:any;
  showpaysreen:any;
  showsummarysreen:any;
  location:any;
  locality:any;  //added Nov 01,2019
  location1:any;
  bidscreen:any;
  location_type:any;
  categoryname:any;
  //biplab phase2 0828
	sp_check:any;
	cat_id:any;
	msg:any;
	address1:any;
	address2:any;
	userid:any;
	sp_availality:any;
  //--------

    sublocation:any;
    postalcode:any;

    area:any;
    adminarea:any;
    country:any;
  loc:any;
radius:any;
radiuss:any;
loc1:any;
status:any;
status1:any;

autocompleteItems;
autocompleteItems1;
autocomplete;
value='1';
service:any;
thoroughfare:any;
subThoroughfare:any;
add:any;
  //------------------------

  constructor(public navCtrl: NavController,public user: User,public general: General,public api: Api,private network: Network,
  public navParams: NavParams,private storage: Storage,public httpClient: HttpClient,public toastCtrl: ToastController,
  private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation,private alertCtrl: AlertController,
  public loadingCtrl: LoadingController,private ConnectivityServiceProvider:ConnectivityServiceProvider) {
this.storage.get('userid').then(userid=>{
           this.address.userid=userid;
           this.delete.userid=userid;
		   this.userid=userid;

		  this.location=this.navParams.get('location');
		  this.categoryname=this.navParams.get('categoryname');
		  this.lat=this.navParams.get('lat');
		  this.lng=this.navParams.get('lng');
		  this.useraddress=this.navParams.get('useraddress');

         });
/*

//moveed this code below under ionviewDidLoad to test performance
            this.storage.get('userid').then(userid=>{
                  this.api.post('getcustomerlatlng', {userid:userid}).subscribe((res:any) => {
                        this.lat=res.lat;
                        this.lng=res.lng;
						//biplab phase2
						this.id =res.id;
                   });
            });
this.storage.get('userid').then(userid=>{
    this.api.post('getservicetype', {userid:userid}).subscribe((resp:any) => {
    this.location=resp.servicetype;
    });
});


this.storage.get('catid').then(catid=>{
    this.api.post('getcategoryname', {catid:catid}).subscribe((resp:any) => {
    this.categoryname=resp.getcategoryname;
    });
});

*/
  }

  ionViewDidLoad() {
    //this.general.showLoading();
	/*
	let loading =  this.loadingCtrl.create({
		spinner:'hide',
		content: '<img src="assets/img/busy.gif">',
		dismissOnPageChange: true
		//content: 'Loading Please Wait...'
		});
		 loading.present();
		*/

	this.storage.get('userid').then(userid=>{

	//-----------code moved from above to here for better performance ---------------------
	//--------------------------------------------------------------------------------------------------------------------
		if (this.lat==undefined)
	{
	this.storage.get('userid').then(userid=>{
	  this.api.post('getcustomerlatlng', {userid:userid}).subscribe((res:any) => {
			this.lat=res.lat;
			this.lng=res.lng;
			//biplab phase2
			this.id =res.id;
	   });
	});
	}

	if(this.location==undefined)
	{
	this.storage.get('userid').then(userid=>{
		this.api.post('getservicetype', {userid:userid}).subscribe((resp:any) => {
		this.location=resp.servicetype;
		});
	});
	}

	if(this.categoryname==undefined)
	{
	this.storage.get('catid').then(catid=>{
		this.api.post('getcategoryname', {catid:catid}).subscribe((resp:any) => {
		this.categoryname=resp.getcategoryname;
		});
	});
	}

	if (this.useraddress==undefined)
	{
    this.api.post('getUserAddress', {userid:userid}).subscribe((res:any) => {
	//loading.dismiss();
                   if(res.status=='success')
                   {
                       this.general.showToast(res.message);
                       this.useraddress=res.useradresses;

                       this.general.hideLoading();

                   }
                   else
                   {
                          this.general.showToast(res.message);
                          this.useraddress='';
                          this.general.hideLoading();

                   }

                   if(this.useraddress.length >= 5)
                   {
                     this.showaddress=false;
                   }
                   else
                   {
                     this.showaddress=true;
                   }
               });
	}//if end

//	loading.dismiss();
	//----------------------------moved from next page to this page for performance improvement

			this.geolocation.getCurrentPosition().then((resp) => {

			  let options: NativeGeocoderOptions = {
				  useLocale: true,
				  maxResults: 5
			  };

		  //biplab phase2 0822 - default device lat/lng value capture
		  this.lat=resp.coords.latitude;
		  this.lng=resp.coords.longitude;
//alert ('Lat-lng='+	 this.lat+ "--"+this.lng);

			this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options).then((result: NativeGeocoderReverseResult[]) =>{

			if(result[0].thoroughfare!=undefined)
			{
				this.thoroughfare=result[0].thoroughfare+", ";
			}
			else
			{
				this.thoroughfare='';
			}
			//--------------------------------------------------------------------------------
			if(result[0].subThoroughfare!=undefined)
			{
				this.subThoroughfare=result[0].subThoroughfare+", ";
			}
			else
			{
				this.subThoroughfare='';
			}

		   // placemark.put("subThoroughfare", address.getSubThoroughfare() != null ? address.getSubThoroughfare() : "");
		  //  placemark.put("areasOfInterest", address.getFeatureName() != null ? new JSONArray(new String[]{ address.


			if(result[0].locality!=undefined)
			{
				this.locality=result[0].locality+", ";
			}
			else
			{
				this.locality='';
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

//alert('postal code='+this.postalcode);

//alert('loc1='+this.subThoroughfare+"--"+this.thoroughfare+"--"+this.sublocation+"--"+this.location+"--"+this.area+"--"+this.adminarea+"--"+this.country+"--"+this.postalcode);


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
			//subThoroughfare

			//alert('loc2='+this.subThoroughfare+""+this.thoroughfare+""+this.sublocation+""+this.location+""+this.area+""+this.adminarea+""+this.country+""+this.postalcode);
			//alert('location1='+this.location1);

			this.location1 = this.subThoroughfare+""+this.thoroughfare+""+this.sublocation+""+this.locality+""+this.area+""+this.adminarea+""+this.country+""+this.postalcode;
			let add = this.subThoroughfare+""+this.thoroughfare+""+this.sublocation+""+this.locality+""+this.area+""+this.adminarea+""+this.country+""+this.postalcode;
			this.autocomplete.query=add;



			});
			});



	//-----------------------------------------------------------------------------------------

  	});



	//  loading.onDidDismiss(() => {
    //console.log('Dismissed loading');
	//console.log('ionViewDidLoad CustomeraddressPage');
  //});

    //console.log('ionViewDidLoad CustomeraddressPage');
  }


gotoNewAddress(id)
{
//biplab phase2 0821
//id =add here ----------------------remove later
//alert('location='+this.location1+"-->"+this.lat+" -->"+this.lng);
 // this.navCtrl.push('HomemapPage', {id:id});

 this.navCtrl.push('HomemapPage', {lat:this.lat,lng:this.lng,location:this.location1,id:id});
}

gotoAddAddress(id,lat,lng,location)
{
   this.navCtrl.push('HomemapPage', {lat:lat,lng:lng,location:location,id:id});
}
deleteAddAddress(aid,i)
{
     this.delete.addid=aid;
      this.api.post('deleteUserAddress', this.delete).subscribe((res:any) => {
                   if(res.status=='success')
                   {
                     //this.navCtrl.push('CustomeraddressPage');
                        this.useraddress=res.useradresses;
                        this.useraddress.splice(i, 1);

                        this.general.showToast(res.message);

	                        this.storage.get('userid').then(userid=>{
				    			this.api.post('getUserAddress', {userid:userid}).subscribe((res:any) => {
				                   if(res.status=='success')
				                   {
				                       this.general.showToast(res.message);
				                       this.useraddress=res.useradresses;
				                   }
				               });
	  						});

                   }
                   else
                   {
                          this.general.showToast(res.message);
                          this.useraddress=res.useraddress;

                   }

               });
}

updateCucumber(location_type,address1,address2,lattitude,longitude)
{
  //this.location=location_type+'-'+address1+'-'+address2+'-'+lattitude+'-'+longitude;

}


gotoNetScreen()
{

var str = this.location;
var res = str.split("@");
 //if(res[3]=='' || res[4]=='' || res[3]==undefined || res[4]==undefined || res[3]=='null' || res[4]=='null')
// {
//      this.general.showToast('Location Lat/Long not available');
localStorage.setItem("customeraddress",this.location);
// this.general.showToast('location='+ this.location+'--'+res[3]+'--'+res[4]);
//if(this.location=='-----')
if(this.location=='@@@@@')
 {
          this.general.showToast('Select Address');

 }
 else
 {

	 //
		if(res[3]=='' || res[4]=='' || res[3]==undefined || res[4]==undefined || res[3]=='null' || res[4]=='null')
		{
		this.general.showToast('Location Lat/Long not available');

	 //

	//	this.storage.set("customeraddress",this.location);
    //    if(this.location=='-----')
    //    {
    //      this.general.showToast('Select Address');
        }
        else
        {

          this.storage.get('catid').then(catid=>{
			//biplab phase2 0828
			this.address1=res[1];
			this.address2=res[2];
			this.lat=res[3];
			this.lng=res[4];

	//this.general.showToast('Catid='+catid);
			////
            this.api.post('getcustomerstatus', { catid:catid,lat:this.lat,lng:this.lng }).subscribe((res:any) => {
			if(res.status=='success')
			{

				this.catstatus=res.catstatus;
				this.startscreen=res.startscreen;
				this.endscreen=res.endscreen;
				this.showsummarysreen=res.showsummarysreen;
				this.showpaysreen=res.showpaysreen;
				this.bidscreen=res.bidscreen;
				// biplab phase2 0828
				this.sp_check=res.sp_check;
				this.cat_id=res.cat_id;
				this.sp_availality=res.sp_availality;
				this.msg=res.msg;
			//
			}

//alert('getcustomerstatus='+this.showsummarysreen+'----'+this.startscreen);

            if(this.sp_availality==0 && this.sp_check==1)
            {
				let toast = this.toastCtrl.create({
				message: this.msg,    //Service Provider not available at this point,Please try after some times
				duration: 3000,
				position: 'bottom'
				});
				toast.present();
				/////////////////////////////////////////

				     this.api.post('savefailed_order', { userid:this.userid,address1:this.address1,address2:this.address2,catid:catid,lat:this.lat,lng:this.lng }).subscribe((res:any) =>
					 {
								if(res.status=='success')
				                   {
										//msg not required

				                   }

					 });

				///////////////////////////////////////////////////

            }
            else if(this.startscreen=='y' || this.startscreen=='Y')
            {
                this.navCtrl.push('ChooseservicedatePage');
            }
            else if(this.endscreen=='y' || this.endscreen=='Y')
            {
                this.navCtrl.push('ChooseserviceenddatePage');
            }
            else if(this.showsummarysreen=='y' || this.showsummarysreen=='Y')
            {
                this.navCtrl.push('SummaryPage');
            }
            else if(this.showpaysreen=='y' || this.showpaysreen=='Y')
            {
                this.navCtrl.push('PaymentpagePage');
            }
            else if(this.bidscreen=='1')
            {
                this.navCtrl.push('BiddingPage');
            }
            });
          });

      }
 }

}

}

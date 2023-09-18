import { Component, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ToastController } from 'ionic-angular';
import { Geofence } from '@ionic-native/geofence';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

declare var google: any;
@IonicPage()
@Component({
  selector: 'page-getuseraddress',
  templateUrl: 'getuseraddress.html',
})
export class GetuseraddressPage {
	@ViewChild('map') mapElement: ElementRef;
 map: any;
      lat:any;
     lng:any;
address1:any;
address2:any;
showoinput:any;
servicelocation:any;
othertype:any;
id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private geofence: Geofence,
  private zone: NgZone, private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation,
  private storage: Storage,public api: Api, public toastCtrl: ToastController,public loadingCtrl: LoadingController) {

    this.address1=this.navParams.get('address1');
    this.id=this.navParams.get('id');
    this.lat=this.navParams.get('lat');
    this.lng=this.navParams.get('lng');
	//this.othertype=this.navParams.get('othertype');
	//this.servicelocation=this.navParams.get('servicelocation');


      this.storage.get('userid').then(userid=>{
          this.api.post('getsingleaddress',{id:this.id}).subscribe((res:any) => {
            this.address2=res.address2;
            this.othertype=res.othertype;
            this.servicelocation=res.location_type;
          });
      });
  }


  ngAfterViewInit() {
 this.getPlaces();
 }


getPlaces() {


      let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        let location = this.address1;

  /* this.nativeGeocoder.forwardGeocode(location, options).then((coordinates: NativeGeocoderForwardResult[]) => {
          this.lat= coordinates[0].latitude;
          this.lng= coordinates[0].longitude; */
              let map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 13,
                    center: new google.maps.LatLng(this.lat,this.lng),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

            let latLng = new google.maps.LatLng(this.lat,this.lng);
            let mapOptions = {
              center: latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            let marker = new google.maps.Marker({
                position: latLng,
                map: map
              });

    //});
}






 gotoNetScreen(id)
{
    if(this.address1=='' || this.address1==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Address can not be null',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
    else if(this.address2=='' || this.address2==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Add Flat / Building / Street',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
    else if(this.servicelocation=='' || this.servicelocation==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Please Enter Address Type',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
	else if (this.servicelocation=='3' && (this.othertype==''||this.othertype==undefined))
	{
		    let toast = this.toastCtrl.create({
            message: 'Please Enter Other Type',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
	}
    else
    {
/*
//biplab phase2 0821 start
let toast = this.toastCtrl.create({
message: "lat/long="+this.address1+this.lat + this.lng,
duration: 8000,
position: 'bottom'
});
toast.present();
//biplab phase2 0821 end
*/
	  	  	let loading =  this.loadingCtrl.create({
			spinner:'hide',
			content: '<img src="assets/img/busy.gif">',
			duration: 2000
			});
			loading.present();

                  this.storage.get('userid').then((userid) => {
                   this.api.post('storeUserAddress', {address1:this.address1,address2:this.address2,servicelocation:this.servicelocation,othertype:this.othertype,lat:this.lat,lng:this.lng,userid:userid,id:id}).subscribe((res4:any) => {
            loading.dismiss();
						 if(res4.status=='success')
                         {
                            let toast = this.toastCtrl.create({
                                message: res4.message,
                                duration: 3000,
                                position: 'bottom'
                            });
                            toast.present();
                            this.navCtrl.push('CustomeraddressPage');

                         }
                         else
                         {
                              let toast = this.toastCtrl.create({
                                  message: res4.message,
                                  duration: 3000,
                                  position: 'bottom'
                              });
                              toast.present();
                              this.navCtrl.push('CustomeraddressPage');
                         }

                   });
                });


            //});

        }
}


gotoChangeScreen()
{
  this.navCtrl.setRoot('HomemapPage');
}
getLocationtype(lval)
{
  if(lval=="3")
  {
    this.showoinput=true;
  }
  else
  {
    this.showoinput=false;
  }


}
}

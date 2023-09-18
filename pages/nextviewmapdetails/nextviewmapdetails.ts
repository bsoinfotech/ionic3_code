import { Component, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Geofence } from '@ionic-native/geofence';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-nextviewmapdetails',
  templateUrl: 'nextviewmapdetails.html',
})
export class NextviewmapdetailsPage {

 @ViewChild('mapview1') mapElement: ElementRef;
map: any;

     lat:any;
     lng:any;
location:any;
radius:any;
lng1:any;
lat1:any;
mapdetails:any;
kms:any;
autocompleteItems;
    autocomplete;
    value='1';
radiuss:any;
rad1:any;
service:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    private geofence: Geofence, private zone: NgZone, private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation, private storage: Storage,public api: Api, public toastCtrl: ToastController,
    public general: General

  ) {
   this.location=this.navParams.get('location');
  this.radiuss=this.navParams.get('radiuss');
  this.lat1=this.navParams.get('lat1');
  this.lng1=this.navParams.get('lng1');
  this.storage.get('userid').then((userid) => {
          this.api.post("getRadiusdetails", { userid:userid}).subscribe((resp:any) => {
                this.mapdetails=resp.mapdetails;
          });
  });
  }


ngAfterViewInit() {
 this.getPlaces(this.radiuss);
 }


getPlaces(a) {


      let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        let location = this.location;
   this.nativeGeocoder.forwardGeocode(location, options).then((coordinates: NativeGeocoderForwardResult[]) => {
          this.lat= coordinates[0].latitude;
          this.lng= coordinates[0].longitude;
          this.rad1 = parseInt(a);

              let map = new google.maps.Map(document.getElementById('mapview1'), {
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
              this.kms=this.radiuss*1000;
			let rad1 = parseInt(this.kms);
			            // Add circle overlay and bind to marker
			let circle = new google.maps.Circle({
			  map: map,
			  radius: rad1,    // 10 miles in metres
			  fillColor: '#AA0000'
			});
			circle.bindTo('center', marker, 'position');

    });
}


changeAdree(loc,rad,lat1,lng1)
{


  this.storage.get('userid').then((userid) => {
          this.api.post("getpartnerstatus", { userid:userid}).subscribe((resp:any) => {
                if (resp.pstatus==1)
                {
                  this.general.showToast(resp.msg);
                }
                else
                {
                  this.navCtrl.push('DraglocationPage', {location:loc, radiuss:rad, lat1:lat1, lng1:lng1});
                }
          });
  });


}


changeRadius(loc,rad,lat1,lng1)
{

  this.storage.get('userid').then((userid) => {
          this.api.post("getpartnerstatus", { userid:userid}).subscribe((resp:any) => {
                if (resp.pstatus==1)
                {
                  this.general.showToast(resp.msg);
                }
                else
                {
                  this.navCtrl.push('EditlocationPage', {location:loc, radiuss:rad, lat1:lat1, lng1:lng1});
                }
          });
  });



}

goProfile()
{
  this.navCtrl.setRoot('ProfileStatusPage');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextviewmapdetailsPage');
  }

}
